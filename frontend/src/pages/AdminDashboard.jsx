import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { formatMessageTime } from "../lib/utils";
import avatar from "../assets/image/avatar.jpg";
import { LuArrowBigRight } from "react-icons/lu";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { TbMessageFilled } from "react-icons/tb";

const AdminDashboard = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messageEndRef = useRef(null);
  const { socket } = useAuthStore();

  const fetchAllMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await axiosInstance.get("/messages");
      setAllMessages(res.data);
      setLoadingMessages(false);
    } catch (error) {
      console.log(error);
    }
  };

  const listenNewMessage = () => {
    socket.on("dashboardMessages", (message) => {
      setAllMessages((state) => [...state, message])

      toast("New Message!", {
        icon: <TbMessageFilled className="text-green-500 text-xl"/>,
        position: 'bottom-right'
      })
    });
  };

  const stopListenNewMessage = () => {
    socket.off("dashboardMessages");
  };

  useEffect(() => {
    fetchAllMessages();
    listenNewMessage();
    return () => {
      stopListenNewMessage();
    };
  }, []);

  const scrollToBottom = () => {
    if (allMessages && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageLoad = () => {
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  if (loadingMessages)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <section className="px-8 sm:px-16 pb-10">
      <div className="mt-3 bg-base-100 p-5 mx-auto max-w-screen-md rounded-xl">
        <h1 className="pb-3 text-2xl font-bold text-center border-base-300 border-b">
          Stupid admin dashboard
        </h1>
        <h2 className="text-lg font-semibold mt-2">All Messages</h2>

        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {allMessages.map((message) => (
            <div key={message._id} ref={messageEndRef}>
              <p className="text-center opacity-50">
                <time> {formatMessageTime(message.createdAt)} </time>
              </p>
              <div className="p-3 flex items-end gap-3 bg-base-300 rounded-xl">
                {/* Sender */}
                <div className="chat chat-start flex-1">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="chat avatar"
                        src={message.senderId.profilePic || avatar}
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <p className="">{message.senderId.fullname}</p>
                  </div>
                  <div className="chat-bubble shadow-sm bg-primary">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="chat image"
                        className="w-[200px] object-cover rounded-md mb-3"
                        onLoad={handleImageLoad}
                      />
                    )}
                    {message.text && (
                      <p className="font-medium break-words text-primary-content">
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-6xl">
                  <LuArrowBigRight />
                </div>

                {/* Receiver */}
                <div className="flex flex-col">
                  <p>{message.receiverId.fullname}</p>
                  <div className="chat-image avatar mt">
                    <div className="w-10 rounded-full">
                      <img
                        alt="chat avatar"
                        src={message.receiverId.profilePic || avatar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
