import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from 'socket.io-client'
import { useChatStore } from "./useChatStore";

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  // Socket.io
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket()
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true })
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success("Account created successfully")

      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true })
      const res = await axiosInstance.post('/auth/login', data)
      set({ authUser: res.data })
      toast.success("Logged in successfully")

      get().connectSocket()
    } catch (error) {
      if (error.response) toast.error('Email or Password is incorrect') 
      else toast.error('Something went wrong...')
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      toast.success("Logged out successfully")

      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    } 
  },

  updateProfile: async (profile) => {
    try {
      set({ isUpdatingProfile: true })
      const res = await axiosInstance.put('/users/profilepic', { profilePic: profile })
      
      set({ authUser: res.data })
      toast.success('Profile updated successfully')
    } catch (error) {
      if (error.response) toast.error(error.response.data.message)
      else toast.error('Something weng wrong...')
    } finally { 
      set({ isUpdatingProfile: false })
    }
  },

  connectSocket: () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return; 
    
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    })
    socket.connect()
    set({ socket })

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds })
      // to show online user first whenever they're online
      useChatStore.getState().sortedOnlineUsers()
    })
  },

  disconnectSocket: () => {
    const { socket } = get()
    if (socket?.connected) socket.disconnect();
  },

  isUserOnline: (userId) => {
    const { onlineUsers } = get()
    return onlineUsers.includes(userId)
  }
}));
