import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already taken'],
    // You might want to add a validation for a valid email format
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
},{
    timestamps:true,
});


export default mongoose.model('User', userSchema);