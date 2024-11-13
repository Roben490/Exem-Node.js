import express, { IRouter, NextFunction } from 'express';
import { addNewUser, getAllItemInOrg, getAllItemInStore, getAllUsers, loginUser, logOut } from '../controllers/dataController';
import { verifyUser } from '../helpers/jwt';

const router: IRouter = express.Router();

router.get('/get', getAllUsers);
router.post('/register', addNewUser);
router.post('/login', loginUser)
router.get('/organization' , getAllItemInOrg)
router.get('/store' , verifyUser as NextFunction , getAllItemInStore)
router.post('/logout', logOut)

export default router;