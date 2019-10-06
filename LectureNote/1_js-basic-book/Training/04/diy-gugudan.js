function gugudan() {
  const list = document.createElement("ol");

  for (let i = 1; i < 10; i++) {
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(`${i} 단`));
    list.appendChild(listItem);

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

document.getElementById("list").appendChild(gugudan());
