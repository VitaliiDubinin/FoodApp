// function sayHello() {
//   //   var message; // hoisting example
//   console.log(message);
//   var message = "James";
//   console.log(message);
//   return message;
// }

// console.log(sayHello());

//hoisting work:
// sayHello();
// function sayHello() {
//   console.log("Happy day!");
// }

// // _____________________________
// // it will work only if function called after it was defined
// // sayHello();

// const sayHello = function () {
//   console.log("Happy day!");
// };

// sayHello();
// //____________________________________

const min_age = 18;
const canVote = (age) => {
  if (age >= min_age) {
    return true;
  }
};

console.log(canVote(18));
