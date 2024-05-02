const addInDb = require('./create');
const searching = require('./find');
const read = require('./read');
const remove = require('./remove');
const update = require('./update');
const {rl, question} = require('./system');

const input = async()=> {
    const menu = ['1.Add data', '2.Read Data', '3.Searching data', '4.Update Data', '5.Delete Data', '6.Exit']
    for (const name of menu){
        console.log(name)
    };

    const choice = await question('What do you want to do (enter the number): ');
    switch (Number(choice)) {
        case 1:
            return addInDb();   
        case 2:
            return read();
        case 3:
            return searching();
        case 4:
            return update();
        case 5:
            return remove();
        case 6: 
            console.log('Thank you');
            rl.close();
        default :
            console.log('Wrong Input')
            rl.close();
            break;
    };
};
input();