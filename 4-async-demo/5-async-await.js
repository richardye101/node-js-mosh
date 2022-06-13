// Async and await approach for previous stuff

// async just means the function will always return a Promise, wrapping any returned value in a promise object
async function displayCommits(){
    try{
        const user = await getUser(1); //returns a promise, which we can use await to get
    const repos = await getRespositories(user.githubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
    }

    catch(err){
        console.log("Error", err.message);
    }
}

displayCommits()

// Callback to get users
function getUser(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'Richard'});
        }, 2000); // 2000 miliseconds, 2 seconds
    });
}

function getRespositories(username){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Retrieving user repositories');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Rejected, no repos'))
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
