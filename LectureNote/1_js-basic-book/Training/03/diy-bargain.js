const originPrice = prompt("원래 가격은?");
const rate = prompt("할인율은?");

if (originPrice.trim().length > 0 && rate.trim().length > 0) {
  document.getElementById("originPrice").innerHTML = originPrice;
  document.getElementById("rate").innerHTML = rate;
  document.getElementById("resultPrice").innerHTML =
    originPrice - originPrice * rate * 0.01;
}
