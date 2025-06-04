
// const transaction = [
//      {
//         id: 1,
//         name: 'salary',
//         amount: 5000,
//         date: new Date(),
//         type: 'income'
//      },
//      {
//         id: 2,
//         name: 'haircut',
//         amount: 20,
//         date: new Date(),
//         type: 'expense'
//      },
//      {
//         id: 3,
//         name: 'concert ticket ',
//         amount: 350,
//         date: new Date(),
//         type: 'expense'
//      },
// ];

// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     signDisplay: 'always',
// })


// const list = document.getElementById('transactionList');
// const status = document.getElementById('status');

// function renderList() {
//     list.innerHTML = " ";

//     if (transactions.length === 0) {
//         status.textContent = "No transactions."
//         return;
//     }

//     transactions.forEach(({ id, name, amount, date, type}) => {
//         const li = document.createElement('li');

//         li.innerHTML = `
//             <div class="name">
//                 <h4> ${name}</h4>
//                 <p> ${new Date(date).toLocaleDateString()}</p>
//             </div>
//             <div class="amount ${type}">
//                 <span> ${formatter.format(amount)}</span>
//             </div>

//             <div class="action"> 
//                 <i class="fa fa-times" aria-hidden="true"></i>
//             </div>



//         `;

//         list.appendChild(li);

//     });
// }
 
// renderList();