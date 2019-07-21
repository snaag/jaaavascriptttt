# day1.js

## String

### ES2015 String에 새로운 메서드들

- `String.startsWith("")`: 임의의 문자열로 시작하는지 판단함
  ```javascript
  let str = "hello world! ^^!";
  let matchstr = "hello";
  console.log(str.startsWith(matchstr)); // true
  ```
- `String.endsWith("")`: 임의의 문자열로 끝나는지 판단함
  ```javascript
  str = "wow hello";
  console.log(str.endsWith(matchstr)); // true
  ```
- `String.includes("")`: 임의의 문자열이 들어있는지 판단함
  ```javascript
  console.log("Wow hello world!".includes(matchstr)); // true
  ```

## Array

### for of - 순회하기

- `forEach`
  ```javascript
  const data = [1, 2, undefined, NaN, null, "HelloWorld"];
  data.forEach(function(value) {
    console.log(value);
  }); // 하나씩 출력해줌
  ```
- `for in` **절대 배열에서 사용하면 안된다**

  ```javascript
  Array.prototype.getIndex = function() {};

  for (let idx in data) {
    console.log(data[idx]); // 1, 2, undefined, NaN, null, HelloWorld, ?
  }
  // 이런 side effect가 생길 수 있다 (예상치 못한 ?의 출력)
  // 따라서 절대 배열에서 for in 을 쓰면 안된다
  ```

- `for of` **for in 의 문제점 개선**

  ```javascript
  for (let value of data) {
    console.log(value);
  }

  for (let value of data[5]) {
    console.log(value); // 문자열도 쪼갤 수 있다
  }
  ```

### spread operator - 배열의 복사

- 펼침 연산자
- `...pre` : 배열 `pre` 의 것들을 하나하나씩 펼쳐서 보여준다

```javascript
let pre = ["apple", "orange", 100];
let newData = [...pre]; // newData는 새로운 공간에 새로운 값으로 들어간 것
console.log(pre == newData); // false
console.log(pre === newData); // false

let pre2 = ["hello", ...pre, "yo"]; // 중간에도 이렇게 사용할 수 있음

console.log(pre2); // pre2 = hello, apple, orange, 100, yo
```

### spread operator - 몇가지 활용

- 함수에 인자 값을 **펼쳐서** 전달하고 싶을 때 사용한다

  ```javascript
  const listNum = [3, 5, 25];
  function sum(a, b, c) {
    return a + b + c;
  }
  console.log(sum(...listNum)); // 3, 5, 25 가 a, b, c 에 차곡차곡 들어간다
  ```

#### 흥미로웠던 점

- 똑같은 값을 가진 array를 두 개 만들려고 할 때, 어떻게 만드냐에 따라 주솟값을 공유할 수도 그렇지 않을 수도 있다

  - 주솟값을 공유하고 똑같은 내용의 array를 만드는 법 (재할당 X)

    - `=` 로 값을 전달한 경우 (1)
    - 그리고 그 뒤에다가 `push()` 연산을 사용한 경우 (2)

  - 주솟값을 공유하지 않고 똑같은 내용의 array를 만드는 법 (재할당 O)

    - `Array.from()` 으로 값을 전달한 경우 (3)
    - `...`(spread 연산자) 로 값을 전달한 경우 (4)
    - 값을 추가할 때 `push()` 가 아닌 `concat()`를 한 경우 (5)

    ```javascript
    let list1 = ["hello", "yo"];

    // (1) = 로 값을 전달한 경우
    list2 = list1;
    console.log(list1 == list2); // true

    // (2) 값을 추가할 때 push() 연산을 사용한 경우
    list1.push("hey");
    console.log(list1 == list2); // true
    console.log(list2); // hello, yo, hey
    // list1에만 추가했는데, list2에도 추가된 것을 볼 수 있다

    list2.push("hey2");
    console.log(list1 == list2); // true
    console.log(list1); // hello, yo, hey, hey2
    // list2에만 추가했는데, list1에도 추가된 것을 볼 수 있다

    list1 = list1.concat(list2, "hello");
    console.log(list1 == list2); // false
    console.log(list2); // hello, yo, hey, hey2
    // list1에만 추가했는데, list2에도 추가된 것을 볼 수 있다

    // (3) Array.from() 을 사용하여 값을 전달한 경우
    let a = [1, 2, 3, 4];
    let b = Array.from(a);
    console.log(a == b); // false

    // (4) spread 연산자를 사용하여 값을 전달한 경우
    const a = [1, 2, 3, 4];
    const b = [...a];
    console.log(a == b); // false

    // (5) 값을 추가할 때 push 가 아닌, concat 을 사용한 경우
    const list3 = ["a", "s", "d", "f"];
    list3.push("yo"); // yo push
    let list4 = [];
    list4 = list4.concat(list3, "yo"); // yo concat
    console.log(list3 == list4); // false
    ```

### from 메서드로 진짜 배열 만들기

- `Array.from()` 으로 값을 전달해서 배열을 만들 수 있다
  ```javascript
  let a = [1, 2, 3, 4];
  let b = Array.from(a);
  console.log(a == b); // false
  ```

## 실습 1

### 특정 문자열이 포함된 배열 만들어 반환하기

- 문제: filter, includes, from을 사용해서 문자열 'e'가 포함된 노드로 구성된 배열을 만들어서 반환하기
- 코드:

```HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <ul>
    <button>javascript</button>
    <button>java</button>
    <button>python</button>
    <button>django</button>
  </ul>
</body>
</html>
```

```javascript
const _list = document.querySelectorAll("button");

const list = Array.from(_list); // from

function filterSome(t) {
  let ret = list.map(function(value) {
    // map
    return value.innerText + "";
  });

  const retFilter = ret.filter(function(value) {
    // filter
    return value.includes(t + "");
  });
  return retFilter.length;
}

console.log(filterSome("a"));
console.log(filterSome("t"));
console.log(filterSome("e"));
```

# day2.js

## Object

### 간단히 객체 생성하기

## Destructuring

- `Destructuring` 으로 객체를 쉽게 만들 수 있다

  ```javascript
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

    // return { getName, setName };
    // 도 된다. 왜냐면 key, value 의 이름이 같으니까
  }

  const obj = getObj();
  obj.setName("yuniq");
  console.log(obj.getName()); // yuniq
  ```

### Destructuring Array

- `Array` 의 식별자는 `index` 이다
- `Destructuring` 을 하여, 원하는 `idx` 의 값을 쉽게 가져올 수 있다

  ```javascript
  let data = ["snaag", "sanga", "yuniq", "yunhee"];
  let [name1, , name2] = data; // 중간에 안받으려면 , ,로 넘기고, 뒤에거를 안받으려면 생략하면 된다
  console.log(name1, name2); // snaag, yuniq
  ```

### Destructuring Object

- `Object` 의 식별자는 `key` 이다
- `Destructuring` 을 하여, 원하는 `key`의 `value` 를 가져올 수 있다

  ```javascript
  let obj = {
    name: "crong",
    address: "Korea",
    age: 10
  };

  let { name, address } = obj;
  console.log(name, address); // crong, Korea

  let { name: myName, address: myAddress } = obj;
  console.log(myName, myAddress); // crong, Korea
  ```

### Destructuring 활용 : JSON 파싱

- `Destructuring` 을 하여, `JSON` 데이터를 쉽게 파싱할 수 있다

  ```javascript
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
  console.log(title, imgurl); // mbc http://2...

  let [{ title: myTitle, imgurl: myImgurl }] = news; // 다른 이름으로 받으니까, 알려줘야함
  console.log(myTitle, myImgurl); // sbs http://1...
  ```

### Destructuring 활용 : Event객체 전달

- `Destructuring` 을 하여, `event`를 더 쉽게 달아줄 수 있다

1. `function` 의 매개변수로 `destructuring` 을 활용하면 된다

```javascript
function getNewsList([, { title, newslist }]) {
  return [title, newslist];
}

console.log(getNewsList(news)); // mbc [news21, news22, news23]
```

2. 긁어온 애들에게 `event` 붙여주기

```HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<div>Hello</div>
<div>Hello2</div>
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis mollis commodo. Sed volutpat dignissim libero at mattis. Morbi euismod diam gravida porta pulvinar. Donec lobortis dolor lectus, sagittis pharetra magna aliquet nec.
</div>
</body>
</html>
```

```javascript
document.querySelectorAll("div").forEach(elem => {
  elem.addEventListener("click", function({ target }) {
    console.log(target.innerText);
  });
}); // 모든 div tag를 가진 애들을 가져온 후, click event를 걸어준다. 클릭하면 안의 내용물이 출력된다. *../Problems/day2.js 참고
```

- `../Problems/day2.js`

```javascript
document.querySelector("div").addEventListener("click", function({ target }) {
  console.log(target.innerText);
}); // 맨 처음의 div tag에게 클릭 리스너 걸어주기

document.querySelectorAll("div").forEach(elem => {
  console.log(elem.textContent);
}); // div tag의 모든 textContent 출력

const list = document.querySelectorAll("div");
list.forEach(elem => {
  elem.addEventListener("click", function({ target }) {
    console.log(target.innerText);
  });
}); // (두 줄) - 모든 div tag에게 click listener 달아주기

document.querySelectorAll("div").forEach(elem => {
  elem.addEventListener("click", function({ target }) {
    console.log(target.innerText);
  });
}); // (한 줄) - 모든 div tag에게 click listener 달아주기
```

## Set & WeakSet

### Set 으로 유니크한 배열만들기

- 중복 없이 유일한 값을 저장하려고 할 때 사용 (중복 체크할 때 유용)
- 따라서 이러한 필요가 있을 경우, `array` 보다 유용하게 사용할 수 있음

* 함수

  - `.add()`: 추가하기
  - `.has()`: 어떤 값이 있는지 없는지 검사
  - `.delete()`: 삭제하기

  ```javascript
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

  console.log(mySet); // crong herry dobi

  if (mySet.has("crong")) {
    mySet.delete("crong"); // delete() : set에서 어떤 데이터 삭제
  }

  console.log(mySet); // herry dobi
  ```

### WeakSet 으로 효과적으로 객체 타입 저장하고

- 참조를 갖고 있는 객체만 저장이 가능하다
- 따라서, 객체를 중복 없이 저장하려고 할 때 유용하게 사용할 수 있다

  ```javascript
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
  ```
