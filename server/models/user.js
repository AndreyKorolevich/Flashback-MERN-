import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  familyName: { type: String, required: true },
  givenName: { type: String, required: true },
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