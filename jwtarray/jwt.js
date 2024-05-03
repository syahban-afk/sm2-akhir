const jwt = require('jsonwebtoken');
const secretKey = 'LEBARAN2024!!!';

function createRegistrationToken(name, address, contact_number) {
    const payload = {
        name: name,
        address: address,
        contact_number: contact_number,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyRegistrationToken(token) {
    try {
        const payload = jwt.verify(token, secretKey);
        return payload;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return "Token has expired.";
        } else {
            return "Invalid token.";
        }
    }
}

// Buat 5 data siswa
const siswa1 = {
    name: "Budi",
    address: "Lampung",
    contact_number: "081234567890"
};

const siswa2 = {
    name: "Rudy",
    address: "Lampung",
    contact_number: "081234567891"
};

const siswa3 = {
    name: "Hotman",
    address: "JKT",
    contact_number: "081234567892"
};

const siswa4 = {
    name: "Santi",
    address: "Bali",
    contact_number: "081234567893"
};

const siswa5 = {
    name: "Dewi",
    address: "Bandung",
    contact_number: "081234567894"
};

const arrSiswa = [siswa1, siswa2, siswa3, siswa4, siswa5];

// Buat token untuk setiap siswa dan simpan ke dalam array
const arrToken = [];
arrSiswa.forEach(siswa => {
    const token = createRegistrationToken(siswa.name, siswa.address, siswa.contact_number);
    arrToken.push(token);
});

// Tampilkan token untuk setiap siswa menggunakan forEach
arrToken.forEach((token, index) => {
    console.log(`Siswa dengan id:${index + 1}\nmenggunakan token:${token}`);
    const verifyRegistrationToken = verifyRegistrationToken(token);
    console.log("Verified Schedule:", verifyRegistrationToken);
    console.log("----------------------------------");
});
