const connection = require('../config/connection')
const bcrypt = require('bcrypt')

async function registerUser(name, email, password, phone) {
    try {
        
        // cek apakah email ini sudah terdaftar atau belum?
        const [existingEmailUser] = await connection.query('SELECT * FROM user WHERE email = ?', [email])
        if (existingEmailUser.length > 0) throw new Error('Email already exists');

        // kita hash password agar tidak dapat di baca artinya pastikan yang kita tulisa pwnya hafal
        // jamal = 13823t8gqe
        const hashPasword = await bcrypt.hash(password, 16);

        // kalau tidak ada maka kita boleh buat email tersebut.
        const [newUser] = await connection.query(
            'INSERT INTO user (name, email, password, phone) values (?,?,?,?)', [name, email, hashPasword, phone]
        )

        return {
            success: true,
            message: 'User has been created',
            data: newUser
        }
    }
    catch (error) {
        throw new Error(error)
    }
}

// Login

module.exports = {registerUser}