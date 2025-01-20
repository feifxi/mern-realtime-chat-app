import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js' 
import { getMessages, getUsersForSidebar, sendMessage, getAllMessages } from '../controllers/message.controller.js'

const router = express.Router()

router.get('/', protectRoute, getAllMessages)

router.get('/users', protectRoute, getUsersForSidebar)

router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)


export default router