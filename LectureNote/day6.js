/* Proxy */
// Proxy로 interception기능 구현
// 어떤 obj를 가로채서, 다른 작업을 추가로 할 수 있는 기능 있음

// 사용방법
const myObj = { name: "crong" };

const proxy = new Proxy(myObj, {}); // obj, handler
console.log(proxy.name); // crong
// 그러면 proxy는 그냥 obj를 감싼 obj 아닌가?
// dma.. proxy의 type은 Object가 아니라, Proxy 야

/// handler
const proxy2 = new Proxy(myObj, {
  get: function(target, property, receiver) {
    // receiver: proxy 객체 자체를 말함
    console.log("get value");
    return target[property];
  },
  set: function(target, property, value) {
    console.log("change value");

    // set value에 할당. 이 것을 하지 않으면, 값이 바뀌지 않는다
    target[property] = value;
  }
});

console.log(proxy2.name); // crong
proxy2.name = "codesquad"; // 이 시점에, set 함수가 불려진다. 이 때 intercept해서 우리의 함수를 만들 수 있다
console.log(proxy2.name); // codesquad
// proxy2의 get함수가 비어있을 때는 undefined가 나온다. 하지만 return 값을 준 후에는, 올바르게 출력이 되는것을 볼 수 있다
// 출력: codesquad

// 이 처럼, 객체를 변환할 때 가로채서 추가적인 작업을 할 수 있다.

// 예를 들어, 사용자가 입력한 어떤 값이 있을 때, 얼마나 자주 변경이 되었는지, click log를 찍는다던지 등 할 때 쓸 수 있다
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
    target["changedValue"] = target["changedValue"] + 1;
    target[property] = value;
  }
});

proxy3.changedValue = 0; // 나는 이걸 해주지 않으면, 아래에서 changedValue가 NaN으로 떠서, 부득이하게 적어줬다
proxy3.name = "sanga"; // change value
proxy3.name = "snaag"; // change value
console.log(proxy3.changedValue); // 2
proxy3.name = "startup campus2";
console.log(proxy3.name); // startup campus2
myObj; // { name: 'startup campus2', changedValue: 3 }

// 이렇게 proxy의 getter, setter를 사용해서 logging을 할 수 있다

/// myObj를 숨기려면, proxy에 바로 넣어주면 된다. 그러면 proxy를 통해서만 접근할 수 있다.

// get 함수가 위와 같은 역할을 할 때(단순히 return만 할 때), 이렇게도 해줄 수 있다
const proxy4 = new Proxy(
  { name: "crong", changedValue: 0 },
  {
    get: function(target, property, receiver) {
      return Reflect.get(target, property); // 이 부분을 신경써서 보기
      // 단순히 값만 뽑아낸다면, 이 방법을 더 권장한다
    },
    set: function(target, property, value) {
      target["changedValue"]++;
      target[property] = value;
    }
  }
);

proxy4.name = "code";
console.log(proxy4.changedValue); // 1

// 사용자가 없는 값에 접근한 경우, 없는 값이라고 알려주는 예외처리를 만들고싶다. 어떻게 만들까?
const proxy5 = new Proxy(
  { name: "crong", changedValue: 0 },
  {
    get: function(target, property, receiver) {
      // return Reflect.get(target, property);
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
