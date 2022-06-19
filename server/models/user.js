import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  phone: { type: String },
  imageUrl: { type: String },
  country: { type: String },
  city: { type: String },
  timeZone: { type: String },
})

const User = mongoose.model('User', userSchema)

export default User