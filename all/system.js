const fs = require('fs');
const readline = require('readline');
const generatedRandomId = require('./generatedRandomId')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// check and create folder
const dir = './db';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
};

// check and create file
const file = './db/db.json'
if (!fs.existsSync(file)){
    fs.writeFileSync(file, '[]', 'utf-8');
};

// question 
const question = (quest) => { 
    return new Promise ((resolve, reject) => {
        rl.question(quest,(answer) => {
            resolve(answer);
        });
    });
};

// add to db
const add = (title, sit, payment, qty, other, feedback) => {
const id = generatedRandomId(5);
const dataDb = {id, title, sit, payment, qty, other, feedback};
const ourFile = fs.readFileSync(file, 'utf-8');
const data = JSON.parse(ourFile);
data.push(dataDb);
fs.writeFileSync(file, JSON.stringify(data));
console.log('Success added to queue');
rl.close();
};

// read
const preview = () => {
   const ourFile = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(ourFile);
    console.log(data)
    rl.close();
};

// searching
const search = (id) => {
    const ourFile = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(ourFile);
    const find = data.find(base => base.id === id);
    if(find){
        console.log(`id ${id} found`);
        console.log(find);
    }else{
        console.log("No such id");
        return null;
    };
};

// update
const updateById = async (id, newData) => {
    const ourFile = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(ourFile);
    const update = data.findIndex(base === base.id === id)

    if (update !== -1){
        data[update] = {...data[update], ...newData}
        fs.writeFileSync(file, JSON.stringify(data))
        console.log('Updated')
    }else{
        console.log('There is no such ID in the database')
    };
    rl.close();
};

// delete 
const removeById = (id) => {
    const ourFile = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(ourFile);
    const remove = data.filter(base => base.id !== id )

    if (remove.length < data.length){
        fs.writeFileSync(file, JSON.stringify(remove))
        console.log('Deleted')
    }else {
        console.log('There is no such ID in the database')
    };
    rl.close();
}

module.exports = {
    add,
    question,
    preview,
    search,
    updateById,
    removeById,
    rl
}
