
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function result(id){
  const cust = await getCustomer(id);
  console.log("Customer", cust)
  if (!cust.isGold){
    return;
  }
  const movies = await getTopMovies();
  console.log('Top Movies', movies);
  
  await sendEmail();
  console.log("Email sent...");
}

result(1);

function getCustomer(id) {
  
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve({ 
          id: 1, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        })
      }, 2000);
    });
}

function getTopMovies() {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  })
  
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve();
    }, 2000);
  })
}