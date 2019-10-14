const firstMeet = prompt("처음 만난 날을 입력하세요 (yyyy/mm/dd)");
const day100 = new Date(new Date(firstMeet).getTime() + dayToTime(100));
const day200 = new Date(new Date(firstMeet).getTime() + dayToTime(200));

document.querySelector("#dday").innerText = `${timeToDate(
  new Date().getTime() - new Date(firstMeet).getTime()
)} 일`;

document.querySelector(
  "#day100"
).innerText = `${day100.getFullYear()}년 ${day100.getMonth()}월 ${day100.getDate()}일`;

document.querySelector(
  "#day200"
).innerText = `${day200.getFullYear()}년 ${day200.getMonth()}월 ${day200.getDate()}일`;

function dayToTime(d) {
  return d * 86400000;
}

function timeToDate(t) {
  return Math.floor(t / 86400000);
}
