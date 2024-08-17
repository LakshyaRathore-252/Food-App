import userModel from '../models/userModels.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'




// Login User..
export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User Does Not Exist"
            })

        }

        // Check password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Please enter correct password",
            });
        }

        // Generate Token
        const token = generateToken(user._id);
        return res.json({
            success: true,
            message: "Login Successful",
            token
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}



// Create Token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const EmailDomains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'aol.com',
    'protonmail.com',
    'live.com',
    'yandex.com',
    'mail.com'
];

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if User Already Exists
        const AlreadyExistUser = await userModel.findOne({ email });
        if (AlreadyExistUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Extract the domain from the email
        const emailDomain = email.split('@')[1];

        // Check if the email domain is allowed
        if (!EmailDomains.includes(emailDomain)) {
            return res.json({
                success: false,
                message: "Temporary email addresses are not allowed"
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password should be at least 8 characters long"
            });
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword,
        });

        const user = await newUser.save();
        const token = generateToken(user._id);

        return res.json({
            success: true,
            message: "Registration successful",
            token
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
