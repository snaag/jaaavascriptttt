const value = prompt("어디까지 계산할지 입력하기");

function facto(v) {
  if (v == 1) return 1;
  return v * facto(v - 1);
}

document.getElementById("facto").innerHTML = facto(value);
