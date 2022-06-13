// a promise holds the object of the eventual result of an async result or error
// object can be pending, fulfilled, or rejected states

// Ways to deal with an async operation
// Callbacks
// Promises
// Async/await

console.log('Before');
getUser(1)
    .then(user => getRespositories(user.gitHubUsername)) // if the inner function returns a value, it will be wrapped in a promise by .then()
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

// const getRepos = getRepositories()

// console.log(user);
console.log('After');

// Callback, once an async op is done running, we call the call back function and pass in the result
function getUser(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'Richard'});
        }, 2000); // 2000 miliseconds, 2 seconds
    });
}

// Callback to get users
function getRespositories(username){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Retrieving user repositories');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 1000);
    });
}

function getCommits(repo){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Retrieving commits");
            resolve(["Commit 1", "Commit 2"]);
        }, 1000);
    });
}

// Dealing with callback hell like above
// Give the callback functions with names


// will produce the result of an async operation
// const p = new Promise(function(resolve, reject){
//     // Do some async work
//     setTimeout(()=>{
//         // resolve(1); // sends the value to the consumers of the promise object (resolved/fulfilled)
//         reject(new Error('message')); // pending -> rejected
//     }, 2000);
// });

// p
//     .then(result => {console.log('Result', result)})
//     .catch(err => console.log('Error', err.message)); // need this line if any errors occur
