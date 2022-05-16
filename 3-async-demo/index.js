console.log('Before');
getUser(1, function(user) {
    console.log('User', user);
    getRespositories(user.gitHubUsername, (repos)=>{
        console.log('Repos owned by user', repos);
    })
    // get repos with callback
});
// console.log(user);
console.log('After');

// Ways to deal with an async operation
// Callbacks
// Promises
// Async/await

// Callback, once an async op is done running, we call the call back function and pass in the result
function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'Richard'});
    }, 2000); // 2000 miliseconds, 2 seconds
}

// Callback to get users
function getRespositories(username, callback){
    setTimeout(()=>{
        console.log('Retrieving user repositories');
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
    // return ['repo1', 'repo2', 'repo3'];
}

