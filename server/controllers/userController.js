import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User doesn`t exist.' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '1h' })
    res.status(200).json({ user, token })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, timeZone, country, city } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exist' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password don`t match' })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      password: hashPassword,
      name: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      phone: '',
      imageUrl: '',
      email,
      timeZone,
      country,
      city
    })
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).json({ user: newUser, token })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const update = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User doesn`t exist.' })
    }

    const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true })

    res.status(200).json({ user: updatedUser })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const updateUserImage = async (req, res) => {
  const { newUserImage, email } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User doesn`t exist.' })
    }
console.log(user)
    const updatedUser = await User.findOneAndUpdate({ email }, { imageUrl: newUserImage }, { new: true })

    res.status(200).json({ user: updatedUser })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const googleSign = async (req, res) => {
  const { email, givenName, name, familyName, imageUrl, timeZone, country, city } = req.body
  try {
    let newUser = await User.findOne({ email })
    if (!newUser) {
      newUser = await User.create({
        firstName: givenName,
        lastName: familyName,
        name,
        phone: '',
        imageUrl,
        email,
        timeZone,
        country,
        city
      })
    }
    res.status(200).json({ user: newUser })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}