import { User } from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'
import { deleteMedia, uploadMedia } from '../utils/cloudinary.js'

export const register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All field are required.'
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'user already exits with this email id.'
      })
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedpassword
    })

    return res.status(201).json({
      success: true,
      message: 'Account created successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to Register'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All field are required.'
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'incorrect email or password'
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'incorrect email or password'
      })
    }

    generateToken(res, user, `Welcome back ${user.name}`)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to Login'
    })
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged out Successfully',
      success: true
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to Logout'
    })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Profile not Found'
      })
    }

    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to LoadUser'
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    console.log(req.body)
    const userId = req.id
    const { name } = req.body
    const profilePhoto = req.file

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not Found'
      })
    }

    if (user.photoUrl) {
      const publicId = user.photoUrl.split('/').pop().split('.')[0]
      deleteMedia(publicId)
    }

    const cloudResponse = await uploadMedia(profilePhoto.path)
    const { secure_url: photoUrl } = cloudResponse

    const updatedData = { name, photoUrl }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true
    }).select('-password')

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: 'profile updated successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to Update'
    })
  }
}
