// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));


// const p = Promise.reject(new Error('reason....'));
// p.catch(error => console.log(error));

const p1 = new Promise((resolve /*reject*/) => {
    setTimeout(() => {
        console.log("Async Op 1....");
        //reject(new Error('something happened....'));
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async Op 2....");
        resolve(2);
    }, 2000);
});


Promise.race([p1,p2])
//Promise.all([p1,p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));