/* Function */
// Arrow function
setTimeout(function() {
  console.log("setttimeout");
}, 1000);

setTimeout(() => {
  console.log("setTimeout arrow");
}, 1000);

// 인자가 너무 길어
let newArr = [1, 2, 3, 4, 5].map(function(value, index, object) {
  return value * 2;
});

// 이렇게 줄일 수 있어
let newArr2 = [1, 2, 3, 4, 5].map(value => {
  return value * 2;
});

// 이렇게도 줄일 수 있어
let newArr3 = [1, 2, 3, 4, 5].map(value => value * 2);

console.log(newArr);
console.log(newArr2);

// Arrow function의 this context

// arrow function
// const myObj = {
//    runTimeout() {
//       setTimeout(() => {
//          this.printData();
//       }, 200);
//    },
//    printData() {
//       console.log("hi codesquad!")
//    }
// }

// myObj.runTimeout();

/*
// this bind
const myObj = {
   runTimeout() {
      setTimeout(function() {
         this.printData();
      }.bind(this), 200);
   },
   printData() {
      console.log("hi codesquad!")
   }
}

myObj.runTimeout();
*/

const el = document.querySelector("p");

const myObj = {
  register() {
    el.addEventListener("click", evt => {
      this.printData(evt.target);
    });
  },
  printData(el) {
    console.log(el.innerText);
  }
};

myObj.register();

// function default parameters
