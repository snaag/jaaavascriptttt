// HTML
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
// <div>Hello</div>
// <div>Hello2</div>
//   <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis mollis commodo. Sed volutpat dignissim libero at mattis. Morbi euismod diam gravida porta pulvinar. Donec lobortis dolor lectus, sagittis pharetra magna aliquet nec.
// </div>
// </body>
// </html>

document.querySelector("div").addEventListener("click", function({ target }) {
  console.log(target.innerText);
}); // 된다 - 맨 처음의 div tag에게 클릭 리스너 걸어주기

document.querySelectorAll("div").forEach(elem => {
  console.log(elem.textContent);
}); // 된다 - div tag의 모든 textContent 출력

const list = document.querySelectorAll("div");
list.forEach(elem => {
  elem.addEventListener("click", function({ target }) {
    console.log(target.innerText);
  });
}); // 된다 (두 줄) - 모든 div tag에게 click listener 달아주기

document.querySelectorAll("div").forEach(elem => {
  elem.addEventListener("click", function({ target }) {
    console.log(target.innerText);
  });
}); // 된다 (한 줄) - 모든 div tag에게 click listener 달아주기
