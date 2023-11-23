import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: User)=> {
    // const userIdString = user.userId.toString ();
    // if(await UserModel.isUserExists(userIdString)){
    //     throw new Error('User already exists')
    // }

    const result = await UserModel.create(user);

    

    // const users = new UserModel(user)

    // if(await users.isUserExists(user.userId)){
    //     throw new Error('User already exists')
    // }
    // const result = await users.save()
    return result;
}

const getAllUsersFromDB = async ()=> {
    const result = await UserModel.find();
    return result;
}

const getSingleUserFromDB = async (userId: number)=> {
    const result = await UserModel.findOne({userId});
    return result;
}

const deleteUserFromDB = async (userId: number)=> {
    const result = await UserModel.updateOne({userId}, {isDeleted: true});
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB
}