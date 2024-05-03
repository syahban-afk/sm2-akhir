const jwt = require('jsonwebtoken')
const secretkey = 'ayambuluneireng365'

function createToken(id, name, classes, address, hobny) {
    const data = { id, name, classes, address, hobny }
    return jwt.sign(data, secretkey)
}

function verify(token) {
    try {
        const decode = jwt.verify(token, secretkey);
        delete decode.iat;
        return decode;
    } catch (error) {
        return null
    }
}

const siswa = {
    id: 1,
    name: "Budi",
    classes: "XI",
    addres: 'Lampung',
    hobby: ["coding php", "coding js", "coding css"]
}

const token = createToken(
    siswa.id, 
    siswa.name, 
    siswa.classes, 
    siswa.addres,
    siswa.hobby
)

console.log(token)