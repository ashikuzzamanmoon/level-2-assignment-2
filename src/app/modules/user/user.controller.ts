import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response)=> {
    try{
        const {user: userData} = req.body;
        const result = await UserServices.createUserIntoDB(userData);
    
        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result
        })
    }catch(err){
        console.log(err);
    }
}


const getAllUsers = async (req: Request, res: Response)=> {
    try{
        const result = await UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users are retrieve successfully',
            data: result
        })
    }catch(err){
        console.log(err);
    }
}

export const UserControllers = {
    createUser,
    getAllUsers,
}