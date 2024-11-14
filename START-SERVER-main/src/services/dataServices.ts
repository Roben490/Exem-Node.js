import { CookieOptions, Response } from "express"
import { comparePassword, generateUserPassword } from "../helpers/bcrypt"
import { generateAuthToken } from "../helpers/jwt"
import { IUser } from "../models/User"
import Users from '../models/User'
import organization, { IOrganizations } from "../models/organization"
import { log } from "node:console"

export const getAllUsersServices = async ():  Promise<IUser[] | undefined> => {
    const data: IUser[] = await Users.find()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    return data
}

export const addUser = async (user: IUser): Promise<IUser> => {
    try {
    const newUser = new Users(user);
    newUser.password = generateUserPassword(newUser.password)
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Failed to add new user");
  }
}

export const updateOrganization = async (updatedOrg: IOrganizations, orgData: IOrganizations[]): Promise<IOrganizations> => {
    try {      
    const pastOrg = organization.findOne({ name: updatedOrg.name });
    await pastOrg.updateOne({updatedOrg})
    return updatedOrg; 
  } catch (error) {
    throw new Error("Failed to update Org");
  }
}

const cookieConfig: CookieOptions = {
    httpOnly: true,          // הגנה מפני XSS - הקוקי לא נגיש דרך JavaScript בצד הלקוח
    secure: true,            // שליחת הקוקי רק בחיבור HTTPS
    sameSite: 'strict',      // הגנה מפני CSRF
    maxAge: 24 * 60 * 60 * 1000  // תוקף של יום אחד (במילישניות)
};
export interface userDTO {
    username: string,
    password: string
}
interface LoginDTO{
    _id: string,
      isAdmin: boolean 
}

export const login = async (user: userDTO, res:Response) => {
    try {
        const foundUser = await Users.findOne({ username: user.username })
        if (!foundUser) return  console.log ("User not found")
        const isPasswordCorrect = await comparePassword(user.password, foundUser.password)
        if (!isPasswordCorrect) return console.log("Incorrect password or Email");
        const {_id, organization } = foundUser
        const token = generateAuthToken( _id );
        res.cookie('token', token, cookieConfig);
        return {foundUser , token};
    } catch (error) {
        throw new Error("Failed to login")
    }
}



export const logout = (res: Response): void => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
    } catch (error) {
        console.log(error);
    }
};



