const bcrypt = require('bcrypt');

//  pass: 1234 -> abcd
// use a salt, a random string added to the beginning or end of passwords

async function run(){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();