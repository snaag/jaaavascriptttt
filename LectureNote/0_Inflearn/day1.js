/* String */
// startsWith
let str = "hello world! ^^!";
let matchstr = "hello";
console.log(str.startsWith(matchstr));

// endsWith
str = "wow hello";
console.log(str.endsWith(matchstr));

// includes
console.log("Wow hello world!".includes(matchstr));

/* Iterator */
// forEach
const data = [1, 2, undefined, NaN, null, "HelloWorld"];
data.forEach(function(value) {
  console.log(value);
});

// for in
Array.prototype.getIndex = function() {};
// 하지만 이런 side effect가 생길 수 있음
// 따라서 절대 배열에서 for in 을 쓰면 안됨!
for (let idx in data) {
  console.log(data[idx]);
}

// for of
// for in 의 문제점 개선
for (let value of data) {
  console.log(value);
}

for (let value of data[5]) {
  // 문자열도 쪼갤 수 있음
  console.log(value);
}

/* spread operator, 펼침 연산자 */
// 1.
// ...pre : pre 의 것들을 하나하나씩 펼쳐서 보여준다
let pre = ["apple", "orange", 100];
let newData = [...pre]; // 새로운 공간에 새로운 배열로 들어간 것
console.log(pre == newData); // false
console.log(pre === newData); // false

const list_a = ["a", "b", "c"];
const list_b = [...list_a];
console.log(list_a === list_b);
console.log(list_a == list_b);

let pre2 = ["hello", ...pre, "yo"]; // 중간에도 이렇게 사용할 수 있음
console.log(pre2);

// 2. 함수에 인자값을 펼쳐서 전달하고 싶을 때
const listNum = [3, 5, 25];
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(...listNum));

// 둘은 주솟값을 공유하기 때문에, push를 한 곳에만 해도 둘 다에게 한 것과 같음
// 하지만 concat(+ spread, Array.from())은 그렇지 않음. (왠지 얘들은 새로운 메모리 주소에 재할당을 해서 그런 것같다)
list1 = ["hello", "yo"];
list2 = list1;
console.log(list1 === list2);
console.log(list1 == list2);

list1.push("hey");
console.log(list1 === list2);
console.log(list2);

list2.push("hey2");
console.log(list1 === list2);
console.log(list1);

list1 = list1.concat(list2, "hello");
console.log(list1 === list2);
console.log(list2);

const list3 = ["a", "s", "d", "f"];
list3.push("yo"); // 이건 되지만
// list3 = list3.concat('yooo!') // 이건 안된다. 그니까 concat은 재할당이 맞는 듯!
// 근데 생각해보니까 a = ? 하면 = 이 들어가니까 무조건 재할당이아닌가..

/* arguments, map function */
// 1. arguments
// function addMark(...arr) {
function addMarkArguments() {
  const newData = [];
  for (let value of arguments) {
    newData.push(value);
  }
  return newData;
}
console.log(addMarkArguments(1, 2, 3, 4, 5));

// 2. map
function addMarkMap() {
  let newArr = Array.from(arguments);
  console.log(newArr === arguments); // false

  let newData = newArr.map(function(value) {
    return value + "!";
  });
  return newData;
}
console.log(addMarkMap(1, 2, 3, 4, 5));
