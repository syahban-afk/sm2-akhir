const {add,question} = require ('./system');

const validation = async(any) => {
    let data;
    do {
        data = await question(any);
        if (!data) {
            console.log('Please fill the answer');
        }
    } while (!data);
    return data
};

const addInDb = async() => {
    const title = await validation('Please enter the title: ');
    const sit = await validation('Please enter the sit code: ');
    const payment =await validation('Please enter the payment method: ');
    const qty = await validation('Please enter the quntity of the ticket: ');
    const other = await validation('Anything Else: ');
    const feedback = await validation('Please enter your feedback: ');
    add(title, sit, payment, qty, other, feedback);
    console.log('Thankyou')
};

module.exports = addInDb;