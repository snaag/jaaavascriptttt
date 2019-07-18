// 프로그래머스 - 시저 암호
function solution(s, n) {
  ll = s.length;
  answer = [];
  for (let i = 0; i < ll; i++) {
    console.log(s[i]);
    console.log(i);

    // 대문자: 97~122
    if (isAlphabet(s[i])) {
      if (isUpperCase(s[i])) {
        console.log(i);
        console.log("upper");

        v = (s.charCodeAt(i) + n) % 122;
        console.log(v);
        console.log(String.fromCharCode(v));
      } else {
        // 소문자: 65~90
        console.log(s.charCodeAt(i) + n);
        v = (s.charCodeAt(i) + n) % 90;
        console.log(v);
        console.log(String.fromCharCode(v));
      }
    } else {
      answer.push(s.charCodeAt(i));
    }
  }
}
