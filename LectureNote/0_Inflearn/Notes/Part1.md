# Part 1

- scope
  - let, closure, immutable array
- string
  - string method
- array
  - for of, spread operator, from method

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
