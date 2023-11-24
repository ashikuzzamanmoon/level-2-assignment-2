import { Request, Response } from "express";
import { UserServices } from "./user.service";
import UserValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response)=> {
    try{

        const {user: userData} = req.body;

        const zodParsedData = UserValidationSchema.parse(userData);

        const result = await UserServices.createUserIntoDB(zodParsedData);
    
        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message || 'User not found',
            error: err
        })
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message || 'User not found',
            error: err
        })
    }
}


const getSingleUser = async (req: Request, res: Response)=> {
    try{
        const {userId} = req.params;
        const userIdNo = +userId
        const result = await UserServices.getSingleUserFromDB(userIdNo);
        res.status(200).json({
            success: true,
            message: 'User is retrieve successfully',
            data: result
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message || 'User not found',
            error: err
        })
    }
}

const deleteUser = async (req: Request, res: Response)=> {
    try{
        const {userId} = req.params;
        const userIdNo = +userId
        const result = await UserServices.deleteUserFromDB(userIdNo);
        res.status(200).json({
            success: true,
            message: 'User is deleted successfully',
            data: result
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message || 'User not found',
            error: err
        })
    }
}

export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser
}