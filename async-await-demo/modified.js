console.log('Before');

// getUser(1, (user) => {
//     console.log('User',user);
//     //Get the repositories
//         getRepositories(user.gitHubUsername, (repo) => {
//             console.log('Repo',repo);
//                 getCommits(repo,displayCommits);
//         });
// });

    //Promises
getUser(1)
    .then(user => getRepositories(user.getHubUsername))
    .then(repo => getCommits(repo[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error',err.message));

    // Async and Await Approach
async function displayCommits() {
    try {
    const user = await getUser(1);
    const repo = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
    }
    catch(err) {
        console.log(new Error(err.message));
    }
}
console.log('After');

//Callbacks

//Async/await

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a db....');
            resolve({id:id, gitHubUsername :'Deepak'});
          
        }, 2000);
    });
    
}


function getRepositories(username) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Reading repos from gh....");
                resolve(['repo1','repo2','repo3']);
            }, 2000);
        });
   


}

function getCommits(repo) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Calling GitHub API....');
        resolve(['commit']);
    },2000);
});


}

