import express from 'express'
const router= express.Router()
import { authAdmin, logoutAdmin, addNewUser,deleteUser,updateUserData,getAllUser,getUserCount } from '../controller/adminController.js'
import {protect} from '../middleware/adminAuthMiddleware.js'

  router.post('/auth',authAdmin)
  router.post('/logout',logoutAdmin)
  router.post('/get-user',protect,getAllUser)
  router.put('/update-user',updateUserData)
  router.delete('/delete-user',deleteUser)
  router.post('/add-user',addNewUser)
  router.get('/user-count', protect, getUserCount);
  
  





export default router