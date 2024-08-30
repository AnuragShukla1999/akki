import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnection from '../config/db.js';


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const [rows] = await dbConnection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'name, email and password are required' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        await dbConnection.promise().query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({
            id: rows.insertId,
            message: "User created successfully"
        });
    } catch (error) {
        next(error);
    }
};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const [rows] = await dbConnection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const validUser = rows[0];
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token).json({
            message: "Sign in successfully",
            token,
            validUser,
            success: true
        });

    } catch (error) {
        next(error);
    }
};