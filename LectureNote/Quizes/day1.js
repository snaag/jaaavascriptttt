// filter, includes, from을 사용해서 문자열 'e'가 포함된 노드로 구성된 배열을 만들어서 반환하기

/* HTML */
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
//   <ul>
//     <button>javascript</button>
//     <button>java</button>
//     <button>python</button>
//     <button>django</button>
//   </ul>
// </body>
// </html>

/* Javascript */
const _list = document.querySelectorAll("button");
const list = Array.from(_list); // from

function filterSome(t) {
  let ret = list.map(function(value) {
    // map
    return value.innerText + "";
  });

  const retFilter = ret.filter(function(value) {
    // filter
    return value.includes(t + "");
  });
  return retFilter.length;
}

console.log(filterSome("a"));
console.log(filterSome("t"));
console.log(filterSome("e"));
