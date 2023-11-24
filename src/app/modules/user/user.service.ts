import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {

  if(await User.isUserExists(user.userId)){
      throw new Error('User already exists')
  }
  

  const result = await User.create(user);

  // const users = new UserModel(user)

  // if(await users.isUserExists(user.userId)){
  //     throw new Error('User already exists')
  // }
  // const result = await users.save()
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
