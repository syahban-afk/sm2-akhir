const jwt = require('jsonwebtoken')
const secretkey = 'ayambuluneireng365'
const payload = { UserId: 1234, UserName: "Kazeo", Kelas: "XI" }
const generateToken = jwt.sign(payload, secretkey)

console.log(generateToken)