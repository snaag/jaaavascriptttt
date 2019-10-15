# Part 03

## 변수와 자료형 그리고 연산자

### 실습 문제

1. 나이 계산 프로그램 (`diy-age`)
   - [.js](../Training/03/diy-age.js)
   - [.html](../Training/03/diy-age.html)
2. 할인 가격 프로그램 (`diy-bargain`)
   - [.js](../Training/03/diy-bargain.js)
   - [.html](../Training/03/diy-bargain.html)

- `prompt` 함수로 사용자에게 입력을 받고 그 값을 저장할 수 있다.

  ```javascript
  const year = prompt("태어난 해를 입력하세요");

  document.getElementById("year").innerHTML = year;
  ```

# Part 04

## 제어문

1. 구구단 표시하기 (`diy-gugudan`)
   - [.js](../Training/04/diy-gugudan.js)
   - [.html](../Training/04/diy-gugudan.html)
2. 팩토리얼 계산하기 (`diy-factorial`)
   - [.js](../Training/04/diy-factorial.js)
   - [.html](../Training/04/diy-factorial.html)

- HTML의 DOM Node에게 함수의 결과값을 바로 넣어줄 수 있다.
  ```javascript
  document.getElementById("list").appendChild(gugudan());
  ```

* JS에서 엘리먼트를 만들고, DOM Node에게 붙일 수 있다.

```javascript
function gugudan() {
  const list = document.createElement("ol");

  for (let i = 1; i < 10; i++) {
    const listItem = document.createElement("li"); // 만들기
    listItem.appendChild(document.createTextNode(`${i} 단`)); // 내용 넣기
    list.appendChild(listItem); // 붙이기

    const innerList = document.createElement("ul");

    for (let j = 1; j < 10; j++) {
      const innerItem = document.createElement("li");
      innerItem.appendChild(document.createTextNode(`${i} X ${j} = ${i * j}`));
      innerList.appendChild(innerItem);
    }
    list.appendChild(innerList);
  }
  return list;
}
```

# Part 06

## 객체

- 객체는 배열과 함께 `non-primitive` type 에 포함된다.

### 객체가 필요한 이유

- 하나의 변수에 다양한 정보를 담기 위함이다. 예를 들어 책의 정보를 담고 있는 `book` 이라는 변수가 필요하다. 이 변수는 `title`, `author`, `price`, `page` 등 다양한 정보를 가지고 있어야 한다. 이러한 변수는 **객체**로 만들 수 있다.
- 하나의 객체 안에는 다양한 타입의 변수가 들어갈 수 있다.

### JavaScript 에서 객체의 종류

- `JavaScript` 는 객체를 인식할 수 있다. 즉 웹 사이트를 만들던, 웹 어플리케이션을 만들던 브라우저나 웹 문서와 관련된 것들이 **객체** 여야 `JavaScript`로 개발을 할 수 있다.

* 내장 객체
  - `Date`, `Math` 와 같이 미리 정의되어있는 객체를 말한다.
* 문서 객체 모델 (DOM)

  - 객체를 사용하여 웹 문서를 관리하는 방식을 말한다.
  - DOM 에서는 웹 문서 뿐만 아니라 웹 문서 안에 포함된 이미지, 링크, 텍스트 필드 등도 모두 각각 별도의 객체로 미리 만들어져있다. 따라서 DOM 객체라는 것은, 웹 문서 내의 모든 객체를 말하는 것이라 생각된다.

* 브라우저 객체 모델 (BOM)
  - 브라우저 정보를 객체로 다루는 것을 말한다.
  - 예를 들어, 브라우저 종류나 버전을 담고 있는 `Navigator` 객체, 방문 기록을 남기는 `History` 객체, 화면 크기 정보가 들어있는 `Screen` 객체 등이 있다. 이들 객체를 사용하면 알림 창을 표시할 수 있고, 사용자 동작에 따라 원하는 사이트로 이동하도록 지정할 수도 있다.
* 사용자 정의 객체
  - 사용자의 필요에 따라 정의된 객체를 말한다.

### 객체의 구성

- 속성 (Property)
  - 값을 담고 있는 정보를 말한다.
- 메서드 (Method)
  - 객체가 어떻게 동작할지를 선언해놓은 함수를 말한다.

* 객체가 함수로 만들어져있으나, 함수(객체)에 함수를 넣을 수 있는 이유는 함수가 1급 객체라서 가능한 것 같다.

### 객체의 프로토타입과 인스턴스

- 프로토타입(Prototype) 은 모든 객체가 공통으로 가지는 속성과 기능을 모아놓은 것을 말한다.
- 프로토타입(Prototype) 을 사용해 만들어낸 객체를 인스턴스(Instance) 라고 한다.

### 프로토타입과 인스턴스, 그리고 DOM

- `JavaScript` 프로그램은 객체를 인식한다.
- `JavaScript` 는 웹 개발을 하는데 사용된다. 따라서 웹 문서(Document)와 관련된 모든 것들을 객체(Object)로 인식하고, 이러한 방식을 문서 객체 모델(DOM)이라 한다.
- 그리고 한 객체가 갖는 공통적인 속성(Property)과 기능(Method)를 모아놓은 것을 프로토타입(Prototype) 이라 한다.
- 그리고 프로토타입(Prototype) 을 사용해 만들어진 객체를 인스턴스(Instance) 라고 한다.
- 따라서 객체와 인스턴스의 차이라 하면, 객체는 어떠한 개념인 것이고 인스턴스는 실물이다.

### 객체 만들어보기

#### 리터럴

- 리터럴이란 선언과 동시에 값을 할당하는 것을 말한다.
  `const a = 'a';`

* 리터럴 방식으로 객체를 만들어보자

```javascript
const toy = {
  price: "25,000",
  name: "로봇",
  showInform: function() {
    console.log(`${this.name}의 가격은 ${this.price}원 입니다.`);
  }
};
```

#### 생성자 함수

```javascript
function toy(name, price, f) {
  this.name = name;
  this.price = price;
  this.f = f;
}
toyRobot = new toy("Robot", "25,000", function() {
  console.log(`이름: ${this.name}, 가격: ${this.price}`);
});
```

# Part 07

## 배열

### 배열 선언하기

- 리터럴 방식으로 선언하기
  `const arr = [1, 2, 3];`
- Array 객체를 사용하여 선언하기
  `const arr = new Array();`

### 함수

- `splice()`
  - 원하는 위치의 요소를 삭제하거나, 추가할 수 있다.
  * `splice(index, opt:삭제할 갯수, opt:그자리에 넣을 값`
  * 이 때 2번째 인자인 `삭제할 갯수` 를 넣지 않으면, index부터 끝까지 삭제한다.

* `pop()`, `shift()`
  - 둘이 비슷한 역할을 한다.
  - `pop()`: 맨 뒤에 있는 요소를 추출한다.
  - `shift()`: 맨 앞에 있는 요소를 추출한다.

### 연습문제

- `html tag` 를 `innerHTML` 을 사용하여 `createElement()` 를 사용하지 않고, 바로 넣을 수 있다.

```javascript
for (let i = 0; i < data.length; i++) {
  items += `<li id='${i}' class='item'>${data[i]}</li>`;
}

itemList.innerHTML = items;
```

- `querySelector()` 를 사용해서 임의의 class, id 를 갖는 도큐먼트 객체에 접근할 수 있다.
  - `document.querySelector("#class")`
  - `document.querySelector("#id")`
