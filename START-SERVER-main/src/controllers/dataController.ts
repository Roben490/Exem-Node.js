import express, { IRouter, Response } from 'express';
import { Request } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { IUser } from '../models/User';
import { addUser, getAllUsersServices, login, logout, userDTO } from '../services/dataServices';
import { missileData, orgData } from '../helpers/seed';

const router: IRouter = express.Router();


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await getAllUsersServices();
      res.status(200).json(users);
    } catch (error) {
      console.error('cannot find users catch');
    }
  };

  export const getAllItemInStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await missileData;
      res.status(200).json(items);
    } catch (error) {
      console.error('cannot find users catch');
    }
  };

  export const getAllItemInOrg = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await orgData;
      res.status(200).json(items);
    } catch (error) {
      console.error('cannot find users catch');
    }
  };




export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try{
      const user: userDTO = req.body
      const RealUser = await login(user, res)
      res.json(RealUser);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  export const logOut = (req: Request, res: Response): void => {
    try {
        logout(res);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.error(error.message);
    }
};

const getDataById = (req: Request, res: Response) => {
    const id =  req.params;
}


export const addNewUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body;
      console.log(user);
      console.log(req.body);
      if (!user) {
        res.status(400).json({ error: "Check yourself" });
        return;}
      const newUser: IUser = await addUser(user);
      console.log(newUser);
      res.status(201).json(newUser);
      return
    } catch (error) {
      res.send("Create new user not success" + error);
      return
    }
  };

