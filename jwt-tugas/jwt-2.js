const jwt = require('jsonwebtoken');

const secretKey = "LEBARAN2024!!!";

function createScheduleToken(prayer_time, meal_time, family_time) {
    const payload = {
        prayer_time: prayer_time,
        meal_time: meal_time,
        family_time: family_time,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyScheduleToken(token) {
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

const scheduleToken = createScheduleToken("08:00 AM", "12:30 PM", "06:00 PM");
console.log("Schedule Token:", scheduleToken);

const verifiedSchedule = verifyScheduleToken(scheduleToken);
console.log("Verified Schedule:", verifiedSchedule);
