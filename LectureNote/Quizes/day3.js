/* 실습예제 2 - Destructuring과 Set을 활용한 로또 번호 생성기 */
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

/* 실습예제 개선해보기 - getRandomNumber에서 뽑은 숫자들을 private하게 만들어보면 어떨까? */
// 밖에서 뽑은 숫자들을 접근할 수 없다면?
// 번호 뽑는건데, weakset보다 weakmap을 사용한 이유? : 객체를 key에 넣어주기 위함!
// 만약 weakmap이 아닌 weakset이라면, 누구의 숫자리스트인지 알기 어렵기 떄문
// 예를 들어 weakMap은 {lotto1:{13,22,36,34,25,23}, lotto2:{23,43,21,41,7,9}, ...} 를했을 때 알아볼 수 있지만
// weakSet이라면 [13,14,15,11,20,9, 22,43,21,32,11,9] 이런식으로 들어가게되어 어디부터가 lotto1이고 어디부터가 lotto2인지 알기 어렵다
const privateLotto = new WeakMap();

function LottoPrivate() {
  const set = new Set();
  privateLotto.set(this, set);
}

LottoPrivate.prototype.getRandomNumbersPrivate = function(maxNumber) {
  const set = privateLotto.get(this);

  for (let i = 0; i < count; i++) {
    // const rng = seedrandom("snaag");
    // const randomNumber = Math.floor(((rng() * 100) % maxNumber) + minNumber); // 제대로 안됨
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
console.log(privateLotto1.getRandomNumbersPrivate(45));
console.log(privateLotto.privateLotto1); // undefined
console.log(privateLotto.has(privateLotto1)); // true
privateLotto1 = null; // 할당 날림!
console.log(privateLotto.has(privateLotto1)); // false

const privateLotto2 = new LottoPrivate();
console.log(privateLotto2.getRandomNumbersPrivate(45));

// 추가 정보 - 랜덤 시드
// 자바스크립트 자체에서 랜덤 시드를 제공하는것은 없다고 하는 것 같다
// MDN: 유의: Math.random()은 암호적으로 안전한 난수를 제공하지 않는다. 보안과 관련된 어떤 것에도 이를 사용하지 말아라.
// 그대신 Web Crypto API 를,  더 정확하게는 window.crypto.getRandomValues() 메소드를 이용하라.
// 이라고 하길래, 한번 찾아봤더니 이런게 나왔다 http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html
// 사용법은
// var seedrandom = require('seedrandom'); 로 가져온 다음
// rng = seedrandom(?); 이렇게 한 후 *?에는 "string" 도, 10 과같은 정수, Float 도 들어갈 수 있다. 다들어가는듯...
// 값이 크다고 큰 값이 들어가거나 그런건 아니었다
rng = seedrandom(10);
console.log(rng()); // 0.969385... 16자리
// 그래서 범위를 지정해주려면
console.log(Math.floor(((rng() * 100) % maxNumber) + minNumber)); // 이렇게 해주면 된다
// 100을 한 이유는 범위가 1~45였기 때문에, 100까지만 곱하면 되기 때문이었고 (어차피 modulo 연산을 하기 때문에 1000을 곱하든 10000을 곱하든 상관은없다. 작지만 않음 된다)
// 그리고 45(maxNumber)를 %해준 이유는, 100을 곱해줄 경우 내가 원하는 최댓값인 45를 넘겨버리기 떄문이었다.
// 그리고 1(minNumber)를 +해준 이유는, 0이 나올 수 있기 때문에 최솟값인 1을 넣어주었다
// 이렇게해서 1~45까지 나올 수 있게 해주었다
// 는 내 코드에서 실제로 사용하진 않았음
// 왜인지는 모르겠지만, random대신 random시드를 사용할 경우 제대로 출력이 뜨지 않았음
// 한두개씩 값 뽑을때는 잘 되엇음
