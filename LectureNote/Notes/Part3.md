# Part 3

- template
  - template, tagged template literals
- function
  - arrow function, this, default parameter, rest parameter
- object
  - create object by using class & prototype, object assign, setPropertyOf, prototype chaining
- module
  - export, import, babel, webpack
- proxy
  - proxy

## Template

### Template 처리

- `Template`
  - `HTML DOM` 을 **동적으로** 그리기 위한, 말 그대로 템플릿 이다

* `Template` 처리는...

  - `UI` 개발에서 중요한 작업이다
  - 왜냐하면 `JSON`으로 응답을 받고 `JS object`로 변환한 후, 어떠한 데이터 처리를 수행한 후에 `DOM`에 추가하기 때문이다

  ```javascript
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

  // 이 JSON(data)을 JS object로 변환한 후, 데이터 처리한 결과를 출력하고 싶다면 이렇게 하면 된다
  let template = `<div>welcome to ${data[0].name} !!</div>`;
  console.log(template); // <div>welcome to coffee-bean !!</div>
  ```

### Tagged Template Literals

- `Template` 의 단점

  - `Template`은 정말 유용하지만, 동적인 처리를 하기에는 쉽지 않다
  - 이를테면.. `data` 에서 `items` 가 있는 경우에는 `items` 의 원소들을 출력하지만 `items` 가 없다면 '주문 가능한 상품이 없습니다' 라고 출력하고 싶은 경우와 같은, 동적인 처리를 하기에는 쉽지 않다

- 단점의 극복

  - 동적인 처리를 `function` 으로 해결할 수 있다
  - 더불어, `style` 도 넣을 수 있다
    - 만든 `template` 을 바탕으로 `DOM` 을 그리니, 당연한 말이기도 하다

  ```javascript
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

  function fn(tags, name, items) {
    console.log(tags); // ['<div>welcome to ', ' !!</div>\n<h2>주문가능항목</h2><div>', '</div>']

    console.log(tags[0]); // <div>welcome ti

    console.log(tags[1]); // !!</div> <h2>주문가능항목</h2><div> **
    console.log(tags[2]); // </div>

    // 따라서 결과는 ``가 들어간 원소들을 제외하고 split 되어서 나온다
    // ** 즉, tags[1]에 <h2>주문가능항목이</h2>이 <h2></h2>이 태그임에도 출력된 이유는, 위에서 선언할 때 ${..}로 감싼 변수가 아니기 때문이다!
    // 이와 달리 나머지는 ${..} 로 감싸져있기 때문에 변수로 취급이 되어서 name 혹은 items (변수명) 을 따로 출력할 수 있다

    if (typeof items == "undefined") {
      items = "<span style='color: red'>주문 가능한 상품이 없습니다</span>"; // 이렇게 style도 넣을 수 있다!
    }
    return tags[0] + name + tags[1] + items + tags[2];
  }

  template = fn`<div>welcome to \${data[1].name} !!</div>
  
      <h2>주문가능항목</h2><div>${data[1].items}</div>`;

  console.log(template); // welcome to starbucks !! 주문가능항목 주문 가능한 상품이 없습니다
  ```

* 위의 코드를 깔끔하게 정리한 코드

```javascript
// data는 동일하여 생략한다

function fn(tags, name, items) {
  if (typeof items == "undefined") {
    items = "<span style='color: red'>주문 가능한 상품이 없습니다</span>"; // style
  }
  return tags[0] + name + tags[1] + items + tags[2];
}

template = fn`<div>welcome to ${data[1].name} !!</div>
<h2>주문가능항목</h2><div>${data[1].items}</div>`;
console.log(template); // welcome to starbucks !! 주문가능항목 주문 가능한 상품이 없습니다
```

- `ForEach` 를 사용하여 위의 코드를 더욱 개선하는 법

  - 위의 코드는 매번 `template` 변수에 값을 `reset` 했다
  - 그렇게 하지 말고, `data`를 `foreach`로 돌려서 보다 깔끔한 결과를 만들어보자

  ```javascript
  // fn은 동일하여 생략한다

  data.forEach(v => {
    // 1. forEach로, data의 원소들을 하나 받는다
    // 2. 그리고 data의 name과 item에 접근하여
    let template = fn`<div>welcome to ${v.name} !!</div><h2>주문가능항목</h2><div>${v.items}</div>`;

    console.log(template); // <div>welcome to starbucks !!</div><h2>주문가능항목</h2><div>주문 가능한 상품이 없습니다</div>
  });
  ```

#### `HTML` 과 `Javascript` 의 최종 정리

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
  </head>
  <body>
    <div id="message"></div>
  </body>
</html>
```

```javascript
const data = [
  {
    name: "coffee-bean",
    order: true,
    items: ["americano", "milk", "green-tea"]
  },
  {
    name: "starbucks",
    order: false
  },
  {
    name: "Ediya",
    order: true,
    items: ["americano", "latte"]
  }
];

function fn(tags, name, items) {
  if (typeof items == "undefined")
    items = "<span style='color: red'>주문 가능한 상품이 없습니다!</span>";

  return tags[0] + name + tags[1] + items + tags[2];
}

data.forEach(v => {
  let template = fn`<h1>welcome to ${v.name} !!</h1><h3>주문가능항목</h3><p>${v.items}</p>`;
  document.querySelector("#message").innerHTML += template;
});
```

## Function

### Arrow function 활용

### Arrow function의 this context

### function default parameters

### rest parameters

## Object

### class 를 통한 객체 생성

- JS에는 class가 없는데..? 그렇다면 뭐지? `keyword` 이다.
- `prototype` 기반으로 만드나, `class` 로 만드나, 둘 다 함수인 것은 같다.

#### prototype 기반으로 만들기

```javascript
function Health(name) {
  this.name = name;
}

Health.prototype.showHealth = function() {
  console.log(this.name + "님 안녕하세요");
};

const h = new Health("crong");
h.showHealth();
```

#### class 를 통해 만들기

```javascript
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
```

- `class`와 `prototype`으로 선언된 객체는 내부적으로는 같은 값(구조)을 갖는다.
- 하지만 `class`로 구현할 경우, 모듈화가 되기 때문에 **가독성** 면에서 유리하다.

### Object assign 으로 JS 객체 만들기

- ES5에서 `Object create` 라는 method가 있었다. 이것은 `prototype` 기반으로 `object`를 만들며, `object`를 만드는 표준적인 방법이다.

```javascript
const healthObj = {
  showHealth: function() {
    console.log("오늘의 운동시간: " + this.healthTime);
  }
};

const myHealth = Object.create(healthObj);
myHealth.healthTime = "11:20";
myHealth.name = "crong"; // 값을 일일히 넣어줘야한다는 불편함 있음

console.log(myHealth);
```

- ES6에서 `Object create`가 개선된 `Object assign` 이라는 method가 등장했다.

```javascript
const healthObj = {
  showHealth: function() {
    console.log("오늘의 운동시간: " + this.healthTime);
  }
};

const myHealth2 = Object.assign(Object.create(healthObj), {
  name: "crong",
  lastTime: "11:20"
});

console.log("myHealth is " + myHealth2);
```

- 결과는 둘이 같으나, `Object assign`의 경우, 들어갈 함수와 값을 한꺼번에 넣을 수 있다는 장점이 있다.
- 만약 `Object assign` 의 과정이 번거롭다면, `Wrapper class`를 만들어 사용할 수 있다.

### Object assign 으로 Immutable 객체 만들기

- Immutable object를 만들고, 값을 바꾸는 방법

```javascript
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
```

- 질문

```javascript
const previousObj = {
  name: "crong",
  lastTime: "11:20"
};

const myHealth = Object.assign({}, previousObj, {
  lastTime: "12:20",
  age: 99
});

myHealth.age = 33;
console.log(myHealth); // { name: 'crong', lastTime: '12:20', age: 33 }
```

- 이렇게 해도 값이 바뀌는데, 이게 왜 `immutable` 객체를 만드는 것이라고 설명했을까?

### Object setPrototypeOf 로 객체 만들기

- `setPrototypeOf`
  - 객체에 어떤 `prototype` 을 setting 해준다.

#### Object 를 만드는 방법

- Object 를 만드는 방법에는 앞서 배운 `Object.assign` 과 오늘 배운 `setPrototypeOf` 가 있다. 둘이 어떻게 다른지 비교해보자.

##### `Object.assign`

```javascript
const myHealth2 = Object.assign(Object.create(healthObj), {
  name: "crong",
  lastTime: "11:20"
});
```

- 앞서 immutable 객체를 만들 때 사용하는 것(바뀐 값만 update) 처럼, copy를 떠 새로운 객체를 만들 수 있게 하는 둥의 **범용적인 기능**을 제공한다.

##### `setPrototypeOf`

- `prototype` 에 추가만 해주는 것이기 때문에 `Object.assign` 보다 **명확**하고 **단순**하다.

```javascript
const healthObj = {
  // prototype을 미리 만들어줬다
  showHealth: function() {
    console.log("오늘 운동시간 : ", this.healthTime);
  },
  setHealth: function(newTime) {
    this.healthTime = newTime;
  }
};

const myHealth = {
  // 객체
  name: "crong",
  healthTime: "11:20"
};

Object.setPrototypeOf(myHealth, healthObj); // myHealth 객체에 prototype으로 healthObj를 지정한다
myHealth.showHealth(); // 오늘 운동시간 :  11:20
```

- 이렇게 하면 `myHealth` 객체의 `__proto__` 하위에 두 메소드가 있는 것을 볼 수 있다.

```javascript
// 이렇게도 만들 수 있다
const healthObj = {
  // prototype을 미리 만들어줬다
  showHealth: function() {
    console.log("오늘 운동시간 : ", this.healthTime);
  },
  setHealth: function(newTime) {
    this.healthTime = newTime;
  }
};

const newobj = Object.setPrototypeOf(
  {
    // 바로 object를 만들고, 거기에 앞서 만들어놓은 prototype을 붙였다
    name: "new crong",
    healthTime: "new 11:20"
  },
  healthObj
);

console.log(newobj); // { name: 'new crong', lastTime: 'new 11:20' }
newobj.showHealth(); // 오늘 운동시간 :  new 11:20
```

- `setPrototypeOf` 는 ES6에서는 사용할 수 있는 문법이지만, 만약 ES5에서 이 기능이 필요하다면 같은 역할을 하는 함수를 만들어서 사용하면 된다. (직접 `__proto__` 에 접근하여 값을 수정하면 된다) [MDN-setPropertyOf](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

```javascript
Object.setPrototypeOf =
  Object.setPrototypeOf ||
  function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };
```

### Object setPrototypeOf 로 객체간 prototype chain 생성하기

- `setPrototypeOf` 를 사용하여, 객체간 prototype chain을 만들 수 있다.

```javascript
// 부모
const healthObj = {
  showHealth: function() {
    console.log("오늘 운동시간 : ", this.healthTime);
  },
  setHealth: function(newTime) {
    this.healthTime = newTime;
  }
};

// 자식
const healthChildObj = {
  getAge: function() {
    return this.getAge;
  }
};

// prototype chaining
Object.setPrototypeOf(healthChildObj, healthObj);

console.log("childObj is ", childObj); // childObj is  { age: 22 }
// console에 찍어보면, setHealth, showHealth가 prototype에 추가된 것을 알 수 있음
```

- 이처럼 `setPropertyOf` 를 사용하여, 미리 만들어 놓은 것을 다른 곳에서 가져다 쓸 수 있다.

```javascript
const lastHealthObj = Object.setPrototypeOf(healthChildObj, healthObj);
```

- lastHealthObj - `__proto__` - `getAge()` - `__proto__` - `setHealth()`, `showHealth()`

## module

### module(export & import)의 이해

- module `import` 와 `export` 는 표준화되어있지 않은 **실험적인** 기능이다. 그러나 `nodeJS` 기반으로 백엔드의 개발을 할 때에는 많은 파일이 필요하다. 하지만 브라우저에서와 달리 `script src` 와같이 파일을 불러올 수 없다. 따라서 `amd`, `commonJS` 에서는 `require`, `define` 등을 사용하여 이 역할을 **대신**하였다.
- `ES2015` 에서 `import`, `export` 에 대한 spec을 제시하였으나 많은 브라우저에서 이를 아직 받아들이지는 못하였다. MS의 edge와 같은 최신 브라우저에서는 작동이 되지만, 모든 브라우저가 그렇지는 않다. 따라서, 작동이 되지 않는 브라우저에서 `import`, `export` 를 사용하려면 **`webpack` 기반으로 환경**을 만들어 놓은 후 **`babel` 을 사용하여 `ES2015`로 transfilling**이 필요하다.

* 먼저 코드를 만든다

```javascript
// src/app.js
import log from "./myLogger";

log("my first test data");
```

```javascript
// src/myLogger.js
export function log(data) {
  console.log(data);
}
```

- 바로 `node app.js`를 하면, 바로 `SyntaxError: Unexpected token import` 이런 에러가 뜨면서 실행이 되지 않는다. 그렇다면 어떻게 실행을 시킬 수 있을까? React에서는 `webpack.config.js` 파일을 만들었고, 강의 또한 마찬가지였지만 강의에서 잘려서 나오는 바람에 실행을 할 수 없어, 다른 [자료](https://www.daleseo.com/js-babel-node/)를 참고하여 실행하였다. 아래는 블로그를 보고 실행한 플로우를 정리하였다.

1. 작성한 코드를 NodeJS에서 실행할 수 있도록 transfilling 하기

- `npm i -D babel-cli`
- `npx babel app.js`

* 이 것을 실행하면, 아래와 같은 결과가 나온다.

```javascript
import { log } from "./myLogger";

log();
```

- `;` 이 끝에 붙은 것 말고는 차이가 없다. 이유는, 어떻게 변환을 할 지 별도의 **설정**을 해주지 않았기 때문이다.

2. Babel preset 설정하기

- `npm i -D babel-preset-env`
- `npx babel --presets env app.js`
- 이 것을 실행하면, 아래와 같은 결과가 나온다.

```javascript
"use strict";

var _myLogger = require("./myLogger");

(0, _myLogger.log)();
```

- 뭔가 많이 바뀌었다. 이것을 빌드해보자.

3. preset 설정해주기

- 빌드하기 전, 바벨의 프리셋 옵션을 주어야한다. 만약 주지 않는다면, 매번 `npx babel-node --presets env app.js` 와 같이 `--preset env` 을 입력해야 한다. 이 것을 미리 세팅해준다면 굳이 입력하지 않고, `npx babel-node app.js` 이렇게만 입력해도 된다.
- 글에서는 `.babelrc` 에 설정하는 방법도 설명했지만 나는 `package.json` 에 추가하는 방법을 사용했기때문에, 그 방법만 적는다.

```json
// package.json
...
"dependencies": {
    "babel-loader": "^8.0.6"
  },
  "babel": {
    "presets": [
      "env"
    ]
  }
```

4. 빌드하기

- `npx babel-node app.js`

* 빌드 된 결과가 출력된다.

```javascript
import { log } from "./myLogger";

log("hi");
```

`hi`

### module(export & import)기반 서비스코드 구현방법

- `export` 와 `export default`
  1. `export default`
  - `import` 시 `{}` 없이 할 수 있다.
  * 예를 들면, `import log from './utility'` 가 가능하다.
  2. `export`
  - `import` 시 `{getTime, getHour}` 와 같이, `{}` 가 필요하다.
- `class`를 활용한 `export`

```javascript
// myLogger.js (export)
export default function log(data) {
  console.log(data);
}

export class MyLogger {
  constructor() {
    this.lectures = ["java", "iOS"];
  }
  getLectures() {
    return this.lectures;
  }
}
```

```javascript
// app.js (import)
import log, { MyLogger } from "./myLogger";

const logger = new MyLogger();

log("hi");
log(`CodeSquad 의 강의 과목은 ${logger.getLectures()} 입니다.`);
```

- `named export object literal`

```javascript
// utility.js
const _ = {
  log(data) {
    console.log(data);
  },

  getTime() {
    return Date.now();
  },

  getCurrentHour() {
    return new Date().getHours();
  }
};

export default _;
```

```javascript
// app.js
import _ from "./utility";

_.log("hi");
_.log(`CurrentHour is ${_.getCurrentHour()}`);
_.log(`GetTime is ${_.getTime()}`);
```

- 둘이 다르다 ([Mash-Up 찬연](https://github.com/chayeoi)님이 알려주셨다)
  - `export default { foo: 1 }`
    - foo property를 가진 객체를 `default export`로 내보낸 것이다.
  - `export { foo }`
    - 미리 위에서 foo라는 변수를 선언해두고, 아래쪽에서 `named export`한 것이다.

## Proxy

### Proxy 로 interception 기능 구현

- 네트워크 수업을 들을 때 서버와 클라이언트 사이에서 존재하는 `Proxy 서버`의 역할에 대해 배운 적이 있다. Proxy의 사전적인 의미는 `대리`이다. 잠시 **서버와 클라이언트 사이에서의 Proxy 서버의 역할**에 대해 짚고 가면 좋을 것 같다. [이 블로그](https://brownbears.tistory.com/191) 를 참고했다.
- `Proxy 서버`는 서버와 클라이언트 사이에 위치하는 것으로, **캐싱**과 **로드밸런싱**을 한다. 캐싱을 하게 되면, 클라이언트가 서버까지 가지 않고 Proxy 서버에서 데이터를 가져올 수 있기 때문에 **보안**과 **속도** 측면에서 성능의 향상을 기대할 수 있다. 즉 **서버의 역할을 `Proxy 서버`가 대리로 한다는 의미**에서 proxy 라는 이름을 붙인 것 같다.
- 이것이 **Javascript에서는 어떤 역할을 하기에 proxy 라는 이름을 붙였는지** 강의를 들으면서 알 수 있었다. JS에서의 proxy는 어떤 object를 **가로채서 다른 작업을 추가로 할 수 있도록** 한다.

#### Proxy 사용해보기

```javascript
// object를 만든다
const myObj = { name: "crong" };

const proxy = new Proxy(myObj, {});
console.log(proxy.name); // crong
```

- 앞의 `myObj` 가 가로챔을 당할(?) `object` 이고, 뒤의 `{}`가 `handler function` 이다.
- 결과를 보면 기존에 object가 가지고 있던 값을 반환하는데, 그렇다면 proxy는 object를 감싼 object가 아닐까 싶지만 type을 보면 그렇지는 않다. proxy는 `Proxy`라는 다른 type을 가진다.

#### Proxy의 `handler function` 사용해보기

- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)에서 proxy에 대해 `Proxy 객체는 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 새로운 행동을 정의할 때 사용합니다.` 라고 말한다. 새로운 행동을 정의하도록 하는 함수가 `handler function` 이다.

```javascript
const proxy2 = new Proxy(myObj, {
  get: function(target, property, receiver) {
    // getter
    // target: object (myObj)
    // property: object가 가진 속성 (myObj에서는 name이 property 이다)
    // receiver: proxy 객체 자체
    console.log("get value");
    return target[property];
    // return Reflect.get(target, property);
    // 단순히 값만 반환하는게 목적이라면 이 방법을 더 권장한다고 한다.
  },
  set: function(target, property, value) {
    // setter
    console.log("change value");

    target[property] = value;
    // target[property]에 할당한다
    // 이것을 하지 않으면, 값이 바뀌지 않는다
  }
});

console.log(proxy2.name); // get value (getter), crong
proxy2.name = "codesquad"; // change value (setter)
console.log(proxy2.name); // get value (getter), codesquad
```

- `get()` 함수는 `proxy2.name`과 같은 get 이 발생할 때마다 호출이 된다. `set()` 함수는 `proxy2.name = 'codesquad'`와 같은 set 이 발생할 때마다 호출이 된다. 따라서 **이 시점에 intercept해서 우리가 원하는 추가적인 작업**을 할 수 있게 된다.

#### Proxy의 `handler function` 을 사용하여 값이 변경된 횟수를 로깅해보기

```javascript
const myObj3 = {
  name: "crong",
  changedValue: 0
};
const proxy3 = new Proxy(myObj, {
  get: function(target, property, receiver) {
    console.log(`get value of ${property}`);
    return target[property];
  },
  set: function(target, property, value) {
    console.log("change value");
    target["changedValue"] = target["changedValue"] + 1; // 로깅하는 부분이다
    target[property] = value;
  }
});

proxy3.changedValue = 0; // 나는 이걸 해주지 않으면, 아래에서 changedValue가 NaN으로 떠서, 부득이하게 적어줬다
proxy3.name = "sanga"; // change value
proxy3.name = "snaag"; // change value
console.log(proxy3.changedValue); // 2
proxy3.name = "startup campus2";
console.log(proxy3.name); // startup campus2
console.log(myObj); // { name: 'startup campus2', changedValue: 3 }
```

- `set()` 함수에서 값이 바뀔 때 마다 `target["changedValue"] = target["changedValue"] + 1;` 를 해주고 있다. 마지막에 출력했을 때 `changedValue: 3` 인 것을 볼 수 있다.

#### Proxy의 `handler function` 을 사용하여 사용자가 없는 `property`에 접근했을 때 알려주는 예외처리 만들기

```javascript
const proxy5 = new Proxy(
  { name: "crong", changedValue: 0 },
  {
    get: function(target, property, receiver) {
      return property in target ? target[property] : "anonymous";
    },
    set: function(target, property, value) {
      target["changedValue"]++;
      target[property] = value;
    }
  }
);

console.log(proxy5.age); // anonymous
console.log(proxy5.status); // anonymous
console.log(proxy5.name); // crong
```

- `return property in target ? target[property] : "anonymous"` 삼항연산자를 사용하여 `property`가 `target` 에 없을 경우 `"anonymous"` 라는 텍스트를 리턴하도록 했다.
