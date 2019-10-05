export default function log(data) {
  console.log(data);
}

/* utility */

// 이 함수를 쓰고 싶다면? export 하면 된다
// export const getTime = () => {
//   return Date.now();
// };

export const getCurrentHour = () => {
  return new Date().getHours();
};

/* Class */
export class MyLogger {
  constructor() {
    this.lectures = ["java", "iOS"];
  }
  getLectures() {
    return this.lectures;
  }
}
