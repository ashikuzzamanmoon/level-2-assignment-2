import { Schema, model } from 'mongoose';
import { Address, FullName, Order, User } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const FullNameSchema = new Schema<FullName>({
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

const AddressSchema = new Schema<Address>({
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

const OrderSchema = new Schema<Order>({
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

const UserSchema = new Schema<User>({
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
UserSchema.pre('save', async function(next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next()
});

UserSchema.post('save', function(doc, next){
    doc.password = '';
    next();
})

const UserModel = model<User>('User', UserSchema);

export { UserSchema, UserModel };
