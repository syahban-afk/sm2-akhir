const jwt = require('jsonwebtoken');

const secretKey = "LEBARAN2024!!!";

function createRegistrationToken(name, addres, contact_number) {
    const payload = {
        name: name,
        addres: addres,
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

const registrationToken = createRegistrationToken("John Doe", "123 Main St", "123-456-7890");
console.log("Registration Token:", registrationToken);

const verifiedRegistration = verifyRegistrationToken(registrationToken);
console.log("Verified Registration:", verifiedRegistration);
