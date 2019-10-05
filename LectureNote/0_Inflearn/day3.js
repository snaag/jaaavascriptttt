/*............*/
/* Map & WeakMap */
// Map & WeakMap 추가정보를 담은 객체 저장하기

// Array -> Set, WeakSet (Set: 중복 안됨)
// Object -> Map, WeakMap
// map은 key,value - 중복되지 않고 들어간다 (Object, Map: 중복 안됨 - key,value니까)

let wm = new WeakMap();
let myfun = function() {};

let count = 0;
wm.set(myfun, count); // 이 함수가 몇 번 실행이 되었는지? 알려고 함
// wm : {myfun : 0}

for (let i = 0; i < 10; i++) {
  count = wm.get(myfun) + 1;
  wm.set(myfun, count);
}

console.log(wm.get(myfun)); // 10
myfun = null;
console.log(wm.has(myfun)); // false- 왜냐하면 위에서 myfun의 할당을 해제했으므로, weakmap은 myfun이 사라졌다고 한다

let a = [1, 2, 3];
console.log(wm.set(a, 0));
console.log(wm.set(a, 0));

// WeakMap 활용 : WeakMap 클래스 인스턴스 변수 보호하기
// WeakMap을 활용하여, class의 private한 변수 만들어보기
// 1. private X
function Area1(height, width) {
  this.height = height;
  this.width = width;
}

Area1.prototype.getArea1 = function() {
  return this.height * this.width;
};

let myarea1 = new Area1(10, 20);
console.log(myarea1.getArea1());
console.log(myarea1.height, myarea1.width);

// 2. private △ - object 활용
let obj3 = {};
// obj3 = {'height': 0, 'width':0}

function Area3(height, width) {
  obj3.height = height;
  obj3.width = width;
}

Area3.prototype.getArea3 = function() {
  return obj3["height"] * obj3["width"];
};

let myarea3 = new Area3(10, 20);
console.log(myarea3.getArea3()); // 200
console.log(myarea3.height); // undefined
myarea3 = null;
console.log(obj3);
// myarea3을 할당을 해제했지만 값이 남아있는 이유는, gc가 처리하지 않기 때문임

// 3. private O - WeakMap 활용
const wm2 = new WeakMap();

function Area2(height, width) {
  wm2.set(this, { height, width }); // class 밖의 전역 공간에 변수의 선언이 필요하다는 단점이 있음
}

Area2.prototype.getArea2 = function() {
  const { height, width } = wm2.get(this);
  return height * width;
};

let myarea2 = new Area2(10, 20);
console.log(myarea2.getArea2());
console.log(myarea2.height, myarea2.width);

console.log(wm2.has(myarea2)); // true
myarea2 = null; // null 값을 넣어줌
console.log(wm2.has(myarea2)); // 할당을 해제했기 때문에, false가 나옴.. garbage collector가 치워버리기 때문이다

/*............*/
/* Template */
// Template 처리
/* Template */
// Template 처리
// - ui개발에서 중요한 작업이다
// - 왜냐하면 json으로 응답을 받고, javascript object로 변환한 후에 어떠한 데이터 처리를 수행한 후에
// dom에 추가하기 때문이다

const data = [
  {
    name: "coffee-bean",
    order: true,
    items: ["americano", "milk", "green-tea"]
  },
  {
    name: "starbucks",
    order: false
  }
];

// 이 json을 JS object로 변환한 후 데이터 처리한 결과를 출력하고 싶다면?
let template = `<div>welcome to ${data[0].name} !!</div>`;
console.log(template); // <div>welcome to coffee-bean !!</div>

/* Tagged Template literals */
// Tagged template literals

template = `<div>welcome to ${data[0].name} !!</div>
  <h2>주문가능항목</h2><div>${data[1].items}</div>`;
// tamplete을 그대로 쓰기에는 너무 복잡해서, 주로 function을 사용해서 한다
template = fn`<div>welcome to ${data[0].name} !!</div>
  <h2>주문가능항목</h2><div>${data[0].items}</div>`;

function fn(tags, name, items) {
  // console.log(tags);
  // ['<div>welcome to ', ' !!</div>\n<h2>주문가능항목</h2><div>', '</div>']
  // console.log(tags[0]) // <div>welcome ti
  // console.log(tags[1]) // !!</div> <h2>주문가능항목</h2><div>
  // console.log(tags[2]) // </div>
  // 따라서 결과는 ``이 들어간 애들을 제외하고 split 되어서 나온다
  // 즉, tags[1]에 <h2>주문가능항목이</h2>이 <h2></h2>이 태그임에도 출력된 이유는, 위에서 선언할 때 ${..}로 감싼 변수가 아니기 때문이다!
  // 이와 달리 나머지는 ${..} 로 감싸져있기 때문에 변수로 취급이 되어서 name 혹은 items (변수명) 을 따로 출력할 수 있다

  if (typeof items == "undefined") {
    // items = "주문 가능한 상품이 없습니다"
    items = "<span style='color: red'>주문 가능한 상품이 없습니다</span>"; // 이렇게 style도 넣을 수 있다!
  }
  return tags[0] + name + tags[1] + items + tags[2];
}

// 작성 편의를 위해 tag 지우고 작성함
console.log(template); // welcome to starbucks !! 주문가능항목 americano,milk,green-tea

template = fn`<div>welcome to ${data[1].name} !!</div>
  <h2>주문가능항목</h2><div>${data[1].items}</div>`;
console.log(template); // welcome to starbucks !! 주문가능항목 주문 가능한 상품이 없습니다

console.log("...");

// 위처럼 매번 template 변수에다가 값을 리셋해서 출력하지 않고,
// data를 foreach로 돌려서, 결과값을 알아보자
data.forEach(v => {
  let template = fn`<div>welcome to ${
    v.name
  } !!</div><h2>주문가능항목</h2><div>${v.items}</div>`;

  console.log(template); // <div>welcome to starbucks !!</div><h2>주문가능항목</h2><div>주문 가능한 상품이 없습니다</div>
});

// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
//    <div id="message"></div>
// </body>
// </html>

// const data = [
//     {
//         name: 'coffee-bean',
//         order: true,
//         items:['americano', 'milk', 'green-tea']
//     },
//     {
//         name:'starbucks',
//         order:false
//     },
// {
// name: 'Ediya',
// order: true,
// items: ['americano', 'latte']}
// ]

// function fn(tags, name, items) {
//     if (typeof items == "undefined")
//         items = "<span style='color: red'>주문 가능한 상품이 없습니다!</span>";
//
//     return (tags[0] + name + tags[1] + items + tags[2])
// }

// data.forEach((v) => {
//     let template = fn`<h1>welcome to ${v.name} !!</h1><h3>주문가능항목</h3><p>${v.items}</p>`;
//     document.querySelector("#message").innerHTML += template;
// });
