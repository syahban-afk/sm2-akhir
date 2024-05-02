const {updateById, question, search, rl} = require('./system');
const update = async()=>{
    const id = await question('Please enter the Id: ')
    const existsData = search(id)
    if(existsData){
        const title = await question('Please enter the title: ');
        const sit = await question('Please enter the sit code: ');
        const payment =await question('Please enter the payment method: ');
        const qty = await question('Please enter the quntity of the ticket: ');
        const other = await question('Anything Else: ');
        const feedback = await question('Please enter your feedback: ');

        const updateDb = {
            title: title.trim() !== '' ? title.trim() : existsData.title,
            sit: sit.trim() !== '' ? sit.trim() : existsData.sit,
            payment: payment.trim() !== '' ? payment.trim() : existsData.payment,
            qty: qty.trim() !== '' ? qty.trim() : existsData.qty,
            other: other.trim() !== '' ? other.trim() : other.title,
            feedback: feedback.trim() !== '' ? feedback.trim() : existsData.feedback,
        };
        if (Object.values(updateDb).some(value => value !== undefined && value !== existsData[value])) {
            updateById(id, updateDb);
            console.log('Success');
        } else {
            console.log("No changes made");
        }
    }else {
        console.log(`The ID ${id} does not exist`);
        rl.close()
    }
}

module.exports = update;