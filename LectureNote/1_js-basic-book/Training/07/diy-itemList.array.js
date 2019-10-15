const data = [];
const btnAdd = document.querySelector("#add");
btnAdd.addEventListener("click", add);
const inputBox = document.querySelector("#item");
const itemList = document.querySelector("#itemList");

function show() {
  itemList.innerHTML = "";

  let items = "";
  for (let i = 0; i < data.length; i++) {
    items += `<li id='${i}' class='item'>${data[i]}</li>`;
  }

  itemList.innerHTML = items;

  document.querySelectorAll(".item").forEach(e => {
    e.addEventListener("click", rmv);
  });
}

function add() {
  if (inputBox.value.trim().length > 0) {
    data.push(inputBox.value.trim());
    inputBox.value = "";

    show();
  }
}

function rmv() {
  data.splice(this.id, 1);

  show();
}
