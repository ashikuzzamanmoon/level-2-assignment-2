import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Last name can not be more than 20 characters'],
  },
});

export const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

export const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    trim: true,
  },
});

export const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  fullName: {
    type: FullNameSchema,
    required: [true, 'Full name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'Active status is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required'],
  },
  address: {
    type: AddressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [OrderSchema],
    required: [true, 'Orders are required'],
  },

});

// middleware
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
UserSchema.statics.isUserExists = async function(userId: number){
    const existingUser = await User.findOne({userId});
    return existingUser;
}

export const User = model<TUser, UserModel>('User', UserSchema);

// export { UserModel };

