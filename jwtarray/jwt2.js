const jwt = require('jsonwebtoken');
const secretKey = 'LEBARAN2024!!!';

function createScheduleToken(prayer_time, meal_time, family_time) {
    const payload = {
        prayer_time: prayer_time,
        meal_time: meal_time,
        family_time: family_time
    };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyScheduleToken(token) {
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

// Buat 5 data jadwal
const schedule1 = {
    prayer_time: "08:00 AM",
    meal_time: "12:30 PM",
    family_time: "06:00 PM"
};

const schedule2 = {
    prayer_time: "07:00 AM",
    meal_time: "01:00 PM",
    family_time: "07:00 PM"
};

const schedule3 = {
    prayer_time: "09:00 AM",
    meal_time: "11:30 AM",
    family_time: "05:30 PM"
};

const schedule4 = {
    prayer_time: "06:30 AM",
    meal_time: "02:00 PM",
    family_time: "08:00 PM"
};

const schedule5 = {
    prayer_time: "07:30 AM",
    meal_time: "12:00 PM",
    family_time: "06:30 PM"
};

const arrSchedule = [schedule1, schedule2, schedule3, schedule4, schedule5];

// Tampilkan semua data jadwal menggunakan forEach
arrSchedule.forEach((schedule, index) => {
    const token = createScheduleToken(schedule.prayer_time, schedule.meal_time, schedule.family_time);
    console.log(`Jadwal dengan ID ${index + 1}:`);
    console.log("Schedule Token:", token);
    const verifiedSchedule = verifyScheduleToken(token);
    console.log("Verified Schedule:", verifiedSchedule);
    console.log("----------------------------------");
});
