// Ways to deal with an async operation
// Callbacks
// Promises
// Async/await


// Dealing with callback hell by giving the callback functions names

console.log('Before');
getUser(1, getRepositories);
// console.log(user);
console.log('After');

function getRepositories(user){
    getRespositories(user.gitHubUsername, getCommits);
}
function getCommits(repos){
    getCommits(repos[0], displayCommits);
}
function displayCommits(commits){
    console.log(commits);
}

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

function getCommits(repo, callback){
    setTimeout(()=>{
        console.log("Retrieving commits");
        callback(["Commit 1", "Commit 2"]);
    })
}