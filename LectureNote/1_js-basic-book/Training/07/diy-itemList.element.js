const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", addList);

const inputBox = document.querySelector("#item");
const itemList = document.querySelector("#itemList");

function addList() {
  if (inputBox.value.trim().length > 0) {
    const list = document.createElement("li");
    list.addEventListener("click", rmvList);
    list.appendChild(document.createTextNode(inputBox.value));

    inputBox.value = "";
    itemList.appendChild(list);
  }
}

function rmvList() {
  itemList.removeChild(this);
}
