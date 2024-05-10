const connection = require("../config/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(name, email, password, phone) {
    try {
        // cek apakah email ini sudah terdaftar / belum?
        const [existingUser] = await connection.query(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );
        if (existingUser.length > 0) throw new Error("Email already exits");

        // Kita hash password agar tidak dapat dibaca artinya pastikan yang kita tulis passwordnya hapal
        // jamal = 324fjdijgjdigigj
        const hashPassword = await bcrypt.hash(password, 16);

        // kalau tidak ada maka kita boleh buat email tersebut.
        const [newUser] = await connection.query(
            "insert into user (name, email, password, phone) values (?, ?, ?, ?)",
            [name, email, hashPassword, phone]
        );

        return {
            success: true,
            message: "User has been created",
            data: newUser
        };
    } catch (error) {
        throw new Error(error);
    }
}


// login
async function loginUser(email, password) {
    try {
        const [user] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (user.length === 0) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        // generate token
        const createToken = jwt.sign({ email: user[0].email, password: user[0].password }, 'bazmaSecretKey');
        return { success: true, message: 'Login successful', createToken };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}


// Get ME
async function getMe(token) {
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'bazmaSecretKey');
        const userData = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        }
        return { success: true, message: 'User data retrieved successfully', data: userData };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

module.exports = { registerUser, loginUser, getMe };