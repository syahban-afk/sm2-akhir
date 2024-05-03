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
        const payload = jwt.verify(token, secretKey, { expiresIn: '1d' });
        return payload;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return "Token has expired.";
        } else {
            return "Invalid token.";
        }
    }
}

// Buat 5 data Customer
const Customer1 = {
    name: "Budi",
    address: "Lampung",
    contact_number: "081234567890"
};

const Customer2 = {
    name: "Rudy",
    address: "Lampung",
    contact_number: "081234567891"
};

const Customer3 = {
    name: "Hotman",
    address: "JKT",
    contact_number: "081234567892"
};

const Customer4 = {
    name: "Santi",
    address: "Bali",
    contact_number: "081234567893"
};

const Customer5 = {
    name: "Dewi",
    address: "Bandung",
    contact_number: "081234567894"
};

const arrCustomer = [Customer1, Customer2, Customer3, Customer4, Customer5];

// Buat token untuk setiap Customer dan simpan ke dalam array
const arrToken = [];



arrCustomer.forEach(Customer => {
    const token = createRegistrationToken(Customer.name, Customer.address, Customer.contact_number);
    arrToken.push(token);
});

// Tampilkan token untuk setiap Customer menggunakan forEach
arrToken.forEach((token, index) => {
    console.log(`Customer dengan id ${index + 1} menggunakan token ${token}`);
});
