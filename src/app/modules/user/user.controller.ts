import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
    try {
      const { user: userData } = req.body;
  
      const zodParsedData = UserValidationSchema.parse(userData);
  
      const newUser = await UserServices.createUserIntoDB(zodParsedData);
  
      const userForResponse = { ...newUser.toObject(), password: undefined };
  
      res.status(200).json({
        success: true,
        message: 'User is created successfully',
        data: userForResponse,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'User not found',
        error: err,
      });
    }
  };

  

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users are retrieve successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNo = +userId;
    const result = await UserServices.getSingleUserFromDB(userIdNo);
    res.status(200).json({
      success: true,
      message: 'User is retrieve successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData = req.body;

    const result = await UserServices.updateUserIntoDB(userId, updatedData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const isDeleted = await UserServices.deleteUserFromDB(userId);
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 500, description: 'Internal Server Error' },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const orderData = req.body;

  try {
    await UserServices.addOrderToUser(userId, orderData);

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: { code: 404, description: 'User not found!' },
    });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const orders = await UserServices.getUserOrders(userId);

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    res.json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 500, description: 'Internal Server Error' },
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
  
    try {
      const totalPrice = await UserServices.calculateUserOrderTotal(userId);
  
      if (totalPrice === null) {
        return res.status(404).json({
          success: false,
          message: "User not found or no orders",
          error: { code: 404, description: "User not found or no orders" }
        });
      }
  
      res.json({
        success: true,
        message: "Total price calculated successfully!",
        data: { totalPrice }
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: { code: 500, description: "Internal Server Error" }
      });
    }
  };
  

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addOrder,
  getUserOrders,
  calculateTotalPrice
};
