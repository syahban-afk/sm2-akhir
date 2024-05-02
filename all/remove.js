const {removeById, question} = require ('./system');
const remove = async() => {
    const ask = await question('Please enter the Id: ')
    removeById(ask)
    console.log('thankyou')
}
module.exports = remove;