import {User} from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

export const register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
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
    
    generateToken(res,user,`Welcome back ${user.name}`);


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to Login'
    })
  }
}
