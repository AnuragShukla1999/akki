import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../models/authSchema.js';


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existingUser = await Auth.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await Auth.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            id: newUser.id,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error in signup:', error);
        next(error);
    }
};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await Auth.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .json({
                message: 'Sign in successfully',
                token,
                user,
                success: true
            });

    } catch (error) {
        next(error);
    }
};