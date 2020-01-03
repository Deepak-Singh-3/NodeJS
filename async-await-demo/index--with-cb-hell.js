console.log('Before');

getUser(1, (user) => {
    console.log('User',user);
    //Get the repositories
        getRepositories(user.gitHubUsername, (repo) => {
            console.log('Repo',repo);
                getCommits(repo,displayCommits);
        });
});


console.log('After');

//Callbacks
//Promises
//Async/await

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a db....');
        callback({id:id, gitHubUsername :'Deepak'});
      
    }, 2000);

}


function getRepositories(username, callback) 
{
    setTimeout( () => {
        console.log("Reading repos from gh....");
        callback(['repo1','repo2','repo3']);
    },2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API....');
        callback(['commit']);
    },2000);
    
}

