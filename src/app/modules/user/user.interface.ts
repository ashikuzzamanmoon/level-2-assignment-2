

export type FullName = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders: Order[];
//   isDeleted: boolean;
};

// export interface UserModel extends Model<User>{
//     isUserExists(userId: string): Promise<User | null>
// }

// export type UserMethods = {
//     isUserExists(userId: string): Promise<User | null>
// }

// export type UserModel = Model<User, Record<string, never>, UserMethods>