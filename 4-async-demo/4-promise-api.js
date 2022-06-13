// create an already resolved promise, for things like unit tests

// const p = Promise.reject(new Error('reason')); //.resolve({id:1, });
// p.then(result => console.log(result))
//     .catch(err => console.log('Error', err));


const p1 = new Promise((resolve, reject) => {
    setTimeout(() =>{
        console.log('Asyn op 1...');
        resolve(1);
        // reject(new Error("Failure"));
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() =>{
        console.log('Asyn op 2...');
        resolve(2);
    }, 2001);
});

// processes both promises in parallel, and returns a 
// Promise.all([p1,p2]).
Promise.race([p1, p2]) // this passes the result as soon as the first promise is fulfilled //.all([p1, p2]) // returns new promise that is resolved only when all promises within are resolved
    .then(result => console.log(result))
    .catch(err => console.log(err.message));