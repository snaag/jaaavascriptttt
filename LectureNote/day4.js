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
// default parameter : 기본 매개변수
function sum(value, size) {
  size = size || 1; // size가 없으면 1을 하겠다
  return value * size;
}
console.log(sum(3, 10)); // 30
console.log(sum(3)); // 3

function sum2(value, size = 1) {
  // size의 기본값을 1로 하겠다
  return value * size;
}

console.log(sum2(3, 10)); // 30
console.log(sum2(3)); // 3

// rest parameter
// 사용할 때: 들어오는 인자의 갯수가 동적인 경우 (어떨 때는3개, 어떨 때는 5개..)
function checkNum() {
  console.log(toString.call(arguments)); // [object Arguments]
  // argument 가짜배열
  // argument는 array가 아니기 때문에 사용에 편리하지 않다
  const argArray = Array.prototype.slice.call(arguments);
  console.log(toString.call(argArray)); // [object Array]
  return argArray;
}
let result2 = checkNum(10, 2, "55");
result2; // [10, 2, '55']

function checkNum2(...argArray) {
  console.log(toString.call(argArray)); // [object Array]
  return argArray;
}

console.log(checkNum2(10, 2, 3, 4, 5, "55")); // [10, 2, 3, 4, 5, '55']

/* Class 를 통한 객체 생성 */
// ES6 class
// JS에는 class가 없는데..? 그렇다면뭐지..? keyword 입니다
// prototype기반으로 만드나, class기반으로 만드나, 둘 다 함수인것은 같다
function Health(name) {
  this.name = name;
}

Health.prototype.showHealth = function() {
  console.log(this.name + "님 안녕하세요");
};

const h = new Health("crong");
h.showHealth();

// class도 prototype으로 만든 것 처럼, 내부적으로는 함수로 선언이 되어있다
// (모양만 class일 뿐, function prototype으로 연결되어있다)
// + 모듈화가 되어, 가독성 면에서 유리하다
class Health {
  constructor(name, lastTime) {
    // 내장 키워드 constructor
    this.name = name;
    this.lastTime = lastTime;
  }

  showHealth() {
    console.log("안녕하세요 " + this.name);
  }
}

const myHealth = new Health("crong");
myHealth.showHealth();
console.log(toString.call(myHealth));

/* Object assign으로 JS객체 만들기 */
// obj assign, prototype(JS obj의 중요한 개념)이 ES6에서 어떻게 개선이 되었는지?

// object create method (ES5)
// 프로토타입 기반의 obj를 만듦
// 표준적인 방법
const healthObj = {
  showHealth: function() {
    console.log("오늘의 운동시간: " + this.healthTime);
  }
};

const myHealth = Object.create(healthObj);
myHealth.healthTime = "11:20";
myHealth.name = "crong"; // 값을 일일히 넣어줘야한다는 불편함 잇음

console.log(myHealth);

// object assign method (ES6)
// class
const myHealth2 = Object.assign(Object.create(healthObj), {
  name: "crong",
  lastTime: "11:20"
});

console.log("myHealth is " + myHealth2);
// 결과는 둘이 같다
// 속성값과 프로토타입 객체 안에 들어갈 값을 한번에 넣을 수 있다

// 번거로우면 wrapper class를 사용할 수 있다

/* Object assign으로 Immutable 객체 만들기 */
const previousObj = {
  name: "crong",
  lastTime: "11:20"
};

const myHealth = Object.assign({}, previousObj, {
  lastTime: "12:20",
  age: 99
  // 이전 값과 비교하여, 새로운 값만 업데이트된다
});

console.log(myHealth);
// { name: 'crong', lastTime: '12:20', age: 99 }
console.log(previousObj);
// { name: 'crong', lastTime: '11:20' }

console.log(myHealth === previousObj); // false
console.log(myHealth.name === previousObj.name); // true

// 만약 둘이 가진 모든 값이 갖다고 하더라도, 둘은 같지 않다
// + 이전 데이터 값의 history를 기억하기때문에, 되돌리기를 할 수 있다
