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
