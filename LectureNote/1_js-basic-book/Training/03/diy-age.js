const year = prompt("태어난 해를 입력하세요");
const month = prompt("태어난 달을 입력하세요");
const day = prompt("태어난 일을 입력하세요");

document.getElementById("year").innerHTML = year;
document.getElementById("month").innerHTML = month;
document.getElementById("day").innerHTML = day;

document.getElementById("yourAge").innerHTML = new Date().getFullYear() - +year;
