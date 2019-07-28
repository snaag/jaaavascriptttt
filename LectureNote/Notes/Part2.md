# Part 2

- object
  - create object
- destructuring
  - string method
- set & weakset
  - set, weakset
- map & weakmap
  - map, weakmap, private variable

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

## Map & WeakMap

### Map & WeakMap 추가 정보를 담은 객체 저장하기

- 이쯤에서 다시 짚고가는 `Array` 와 `Set`, `Object` 와 `Map`
  - `Array` -> `Set`, `WeakSet`
    - Set은 **중복을 허용하지 않는다**
  - `Object` -> `Map`, `WeakMap`
    - Object는 **중복을 허용하지 않는다** (`key-value` 이기 때문)

* WeakMap

  - `WeakSet`과 유사한 부분
    - `WeakSet` 처럼, 참조가 없어진다면 `garbage collector` 가 정리해준다
  - `WeakSet`과 다른 부분
    - `WeakSet` 과 달리, 중복은 원래(`Object`)도 허용하지 않았었다 (`WeakMap` 이기 때문에 중복을 허용하지 않는 것이 아니라는 말이다)

* 코드의 목적

  - `{myfun : count}` `key-value` 로, `myfun` 함수가 몇 번 실행되었는지 알려고 한다

  ```javascript
  let wm = new WeakMap(); // WeakMap 만듦
  let myfun = function() {};

  let count = 0;
  wm.set(myfun, count); // 초기값을 넣어준다

  for (let i = 0; i < 10; i++) {
    count = wm.get(myfun) + 1;
    // key를 이용하여 value를 얻어온다
    // 그리고 얻어온 그 값에 1을 더하여, 다시 set을 해준다

    wm.set(myfun, count);
    // key를 이용하여 value를 set한다
  }

  console.log(wm.get(myfun)); // 10
  myfun = null; // myfun의 할당을 해제한다
  console.log(wm.has(myfun)); // false - 왜냐하면 위에서 myfun의 할당을 해제했기 때문에, WeakMap wm은 myfun을 찾을 수 없기 때문이다
  ```

### WeakMap 활용 : WeakMap 클래스 인스턴스 변수 보호하기

- 코드(1, 2, 3)의 목적
  - 변수 두개를 받아, 곱한 결과를 보여준다

* `WeakMap` 을 활용하여, `class` 의 변수를 `private` 하게 만들 수 있다

1. `Private` 하지 않은 경우 (별다른 것 사용하지 않고 만들었을 때)

```javascript
function Area1(height, width) {
  this.height = height;
  this.width = width;
}

Area1.prototype.getArea1 = function() {
  return this.height * this.width;
};

let myarea1 = new Area1(10, 20);
console.log(myarea1.getArea1()); // 200
console.log(myarea1.height, myarea1.width); // 10, 20
// 즉, 내부의 변수인 height, width를 어디서든 바로 접근할 수 있다
// 이걸 안되게 WeakMap을 활용하여 해보자
```

2. `Private` 한 경우 (`Object` 를 사용하여 만들었을 때)

- 문제점

  - 할당을 해제했음에도 값이 남아있다
  - 왜냐하면, `gc(garbage collector)`가 이를 알지 못하여 **처리하지 못했기 때문**이다

  ```javascript
  let obj2 = {};

  function Area2(height, width) {
    obj2.height = height;
    obj2.width = width;
  }

  Area2.prototype.getArea2 = function() {
    return obj2.height * obj2.width;
  };

  let myarea2 = new Area2(10, 20);
  console.log(myarea2.getArea2()); // 200
  console.log(myarea2.height); // undefined
  myarea2 = null; // 할당 해제
  console.log(obj2); // { height: 10, width: 20 }
  // myarea2의 할당을 해제했지만 값이 남아있는 이유는, gc가 처리하지 않기 때문이다
  ```

#### 흥미로웠던 점

- 제대로 작동하는 다른 경우 (편의상 `Area2()` 와 `getArea2()` 만 작성)

```javascript
function Area2(height, width) {
  obj2["height"] = height;
  obj2["width"] = width;
}

Area2.prototype.getArea2 = function() {
  return obj2["height"] * obj2["width"];
};
```

3. `Private` 한 경우 (`WeakMap` 을 사용하여 만들었을 때)

- 아쉬운 점

  - `class` 밖의 전역 공간에 변수(`WeakMap`)의 선언이 필요하다

```javascript
const wm3 = new WeakMap();

function Area3(height, width) {
  wm3.set(this, { height, width });
  // class 밖의 전역 공간에 변수 wm3의 선언이 필요하다
}

Area3.prototype.getArea3 = function() {
  const { height, width } = wm3.get(this);
  return height * width;
};

let myarea3 = new Area3(10, 20);
console.log(myarea3.getArea3()); // 200
console.log(myarea3.height, myarea3.width); // undefined undefined

console.log(wm3.has(myarea3)); // true
myarea3 = null; // 할당 해제
console.log(wm3.has(myarea3)); // false - 할당을 해제했기 때문에 gc가 치워버렸기 때문이다
```

### 실습 2

#### Destructuring 과 Set 을 활용한 로또 번호 생성기

- `Destructuring` 과 `Set` 을 활용하여 로또 번호 생성기를 만들어보자

```javascript
const SETTING = {
  name: "LUCKY LOTTO!",
  count: 6,
  maxNumber: 45
};
const lotto = new Set(); // set
const { count, maxNumber } = SETTING;
const minNumber = 1;

function getRandomNumber(maxNumber) {
  for (let i = 0; i < count; i++) {
    const randomNumber =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    if (lotto.has(randomNumber)) {
      i -= 1;
    } else {
      lotto.add(randomNumber);
    }
  }
  return lotto;
}

console.log(getRandomNumber(maxNumber));
```

#### 개선한 실습 예제

- getRandomNumber에서 뽑은 숫자들을 private하게 만들어보자

```javascript
const privateLotto = new WeakMap();

function LottoPrivate() {
  const set = new Set();
  privateLotto.set(this, set);
}

LottoPrivate.prototype.getRandomNumbersPrivate = function(maxNumber) {
  const set = privateLotto.get(this);

  for (let i = 0; i < count; i++) {
    const randomNumber =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    if (set.has(randomNumber)) {
      i -= 1;
    } else {
      set.add(randomNumber);
    }
  }
  console.log(set);
  return lotto;
};

let privateLotto1 = new LottoPrivate();
console.log(privateLotto1.getRandomNumbersPrivate(45)); // 37 22 49 1 19 4
console.log(privateLotto.privateLotto1); // undefined - privateLotto의 key-value 쌍으로 저장했기 때문에, value를 임의로 가져올 수 없다
console.log(privateLotto.has(privateLotto1)); // true
privateLotto1 = null; // 할당 날림
console.log(privateLotto.has(privateLotto1)); // false

const privateLotto2 = new LottoPrivate();
console.log(privateLotto2.getRandomNumbersPrivate(45)); // 18 24 35 38 23 16
```

#### 고민해봤던 것

- 번호만 저장하는것이면 `WeakSet` 을 쓸 수 있을텐데, `WeakMap` 을 사용한 이유는?
  - 객체를 `key` 에 넣어주기 위함 이다
  - 만약 `WeakMap` 이 아닌 `WeakSet` 이라면, 누구의 숫자 리스트인지 알기 어렵게 된다
    - `WeakMap` 은 `{lotto1:{13,22,36,34,25,23}, lotto2:{23,43,21,41,7,9}, ...}` 를했을 때 알아볼 수 있다
    - 하지만, `WeakSet` 이라면 `[13,14,15,11,20,9, 22,43,21,32,11,9]` 이런식으로 들어가게되어 어디부터가 `lotto1` 이고 어디부터가 `lotto2` 인지 알기 어려우며 무엇보다 `lotto1`, `lotto2를` 분리할 수가 없다

#### 흥미로웠던 점

- `Random Seed`
  - 자바스크립트 자체에서 랜덤 시드를 제공하는것은 없다고 하는 것 같다
    > 유의: Math.random()은 암호적으로 안전한 난수를 제공하지 않는다. 보안과 관련된 어떤 것에도 이를 사용하지 말아라. 그대신 Web Crypto API 를, 더 정확하게는 window.crypto.getRandomValues() 메소드를 이용하라.
  * **MDN**에서 이렇게 하길래 한번 찾아봤더니 이런 자료를 얻을 수 있었다
    - [site 1](http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html)
    - [site 1 how to use](http://davidbau.com/encode/seedrandom.js)

* 사용법

  - `npm install seedrandom` 로 다운 받아야 한다

  ```javascript
  var seedrandom = require("seedrandom");

  rng = seedrandom(10);

  console.log(rng()); // 0.969385... 16자리

  // rng = seedrandom(?); 이렇게 한 후 *?에는 "string" 도, 10 과같은 정수, Float 도 들어갈 수 있다. 다들어가는듯...
  // 값이 크다고 큰 값이 들어가거나 그런건 아니었다

  console.log(Math.floor(((rng() * 100) % maxNumber) + minNumber)); // 이렇게 해주면 된다
  // maxNumber = 45, minNumber = 1 이기 때문에 %100을 했다
  ```

#### 아쉬웠던 점

- 예제에서는 `random` 대신 `random seed` 를 사용할 경우 제대로 출력이 뜨지 않았다
- 하지만, 한두개씩 값 뽑을때는 잘 되었다
