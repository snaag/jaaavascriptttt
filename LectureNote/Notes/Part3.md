# Part 3

- template
  - template, tagged template literals
- function
  - arrow function, this, default parameter, rest parameter
- object
  - ...

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
