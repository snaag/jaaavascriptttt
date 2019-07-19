/* Object 사용하기 */
function getObj() {
  let name = "snaag";
  // const 로 선언하면 setName()할 때 안된다

  const getName = _ => {
    return name;
  };

  const setName = newName => {
    name = newName;
  };

  return {
    getName: getName,
    setName: setName
  };

  // return { getName, setName }; // 도 된다
}

const obj = getObj();
obj.setName("yuniq"); // 유 니 큐 !
console.log(obj.getName());

/* Destructuring */
// Array
// array의 식별자는 위치이다
// array의 값 들 중 원하는 위치의 값을 쉽게 가져올 수 있다
let data = ["snaag", "sanga", "yuniq", "yunhee"];
let [name1, , name2] = data; // 중간에 안받으려면 , ,로 넘기고, 뒤에거를 안받으려면 생략하면 된다
console.log(name1, name2);

// Object
// object의 식별자는 key 이다
// object의 값들 중 원하는 key의 value를 쉽게 가져올 수 있다
let obj = {
  name: "crong",
  address: "Korea",
  age: 10
};

let { name, address } = obj;
console.log(name, address);

let { name: myName, address: myAddress } = obj;
console.log(myName, myAddress);

// destructuring 활용
// 1. JSON 파싱
var news = [
  {
    title: "sbs",
    imgurl: "http://1...",
    newslist: ["news11", "news12", "news13"]
  },
  {
    title: "mbc",
    imgurl: "http://2...",
    newslist: ["news21", "news22", "news23"]
  }
];

let [, mbc] = news;
let { title, imgurl } = mbc; // 같은 이름으로 받으니까, 알려줄 필요 없음
console.log(title, imgurl);

let [, { title: _t, imgurl: _i }] = news; // 다른 이름으로 받으니까, 알려줘야함
console.log(_t, _i);

// Distructuring 활용_Event 객체 전달
// 2. function 의 매개변수로 destructurng을 활용하는 방법
function getNewsList([, { title, newslist }]) {
  return [title, newslist];
}

console.log(getNewsList(news));

// 3. 긁어온 애들에게만 이벤트 붙여주기
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
// <div>Hello</div>
// <div>Hello2</div>
//   <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis mollis commodo. Sed volutpat dignissim libero at mattis. Morbi euismod diam gravida porta pulvinar. Donec lobortis dolor lectus, sagittis pharetra magna aliquet nec.
// </div>
// </body>
// </html>
document.querySelectorAll("div").forEach(elem => {
  elem.addEventListener("click", function({ target }) {
    console.log(target.innerText);
  });
}); // 모든 div tag를 가진 애들을 가져온 후, click event를 걸어준다. 클릭하면 안의 내용물이 출력된다. *../Problems/day2.js 참고

/* Set */
// set: 중복 없이 유일한 값을 저장하려고 할 때 사용. 중복 체크할 때 유용.
// 따라서 이러한 필요가 있을 경우, array보다 유용하게 사용할 수 있음
let mySet = new Set();
mySet.add("crong");
mySet.add("herry");
mySet.add("crong"); // 앞에 값과 중복되는 crong은 들어가지 않는다
console.log(mySet);

if (mySet.has("crong")) {
  // has() : set에 어떤 데이터가 있는지 없는지 검사
  mySet.add("dobi");
} else {
  mySet.add("crong");
}

console.log(mySet);

if (mySet.has("crong")) {
  mySet.delete("crong"); // delete() : set에서 어떤 데이터 삭제
}

console.log(mySet);

/* WeakSet */
// 참조를 갖고 있는 객체만 저장이 가능하다
// 따라서, 객체를 중복 없이 저장하려고 할 때 유용하게 사용할 수 있다
let arr = [1, 2, 3, 4, 5];
let arr2 = [5, 6, 7, 8, 9];
let obj = { arr, arr2 };
let ws = new WeakSet();

ws.add(arr); // O
ws.add(arr2); // O
// ws.add("1234") // X
// ws.add(111) // X
// ws.add(null) // X
// ws.add(undefined) // X - 모두 참조를 갖고 있는 객체가 아니기 때문에, 저장할 수 없다
ws.add(obj); // O

console.log(ws.has(arr)); // true

// 이 때, arr에 null값을 넣어주어 참조를 없애준다면?
arr = null;
console.log(ws.has(arr)); // false
