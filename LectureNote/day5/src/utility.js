const _ = {
  log(data) {
    console.log(data);
  },

  getTime() {
    return Date.now();
  },

  getCurrentHour() {
    return new Date().getHours();
  }
};

export default _;
