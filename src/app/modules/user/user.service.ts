import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(user);

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

const updateUserIntoDB = async (id: number, updatedData: TUser) => {
  const existingUser = await User.findOne({ userId: id });
  if (!existingUser) {
    throw new Error('User not found');
  }
  await User.isUserExists(id);
  const result = await User.findOneAndUpdate({ userId: id }, updatedData, {
    new: true,
    projection: { password: 0 },
  });
  return result;
};

const deleteUserFromDB = async (userId: number): Promise<boolean> => {
  const user = await User.findOne({ userId });
  if (!user) {
    return false; // User not found
  }

  await User.deleteOne({ userId });
  return true; // User successfully deleted
};

const addOrderToUser = async (
  userId: number,
  orderData: TOrder,
): Promise<void> => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(orderData);
  await user.save();
};

const getUserOrders = async (userId: number): Promise<TOrder[] | null> => {
  const user = await User.findOne({ userId });
  if (!user) {
    return null; // User not found
  }

  return user.orders;
};

const calculateUserOrderTotal = async (
  userId: number,
): Promise<number | null> => {
  const user = await User.findOne({ userId });
  if (!user || !user.orders) {
    return null; // User not found or no orders
  }

  const total = user.orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0,
  );
  return total;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserIntoDB,
  addOrderToUser,
  getUserOrders,
  calculateUserOrderTotal
};
