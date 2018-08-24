let app = new Vue({
  el: 'main#app',
  data: {
    moment: moment,
    income: 0,
    expense: 0,
    dailyBudge: [
      {
        date: moment("2018-08-23"), item: [
          { type: 'exp', icon: "E", name: "Eletronic", total: 20 },
          { type: 'inc', icon: "W", name: "Work", total: 40 },
          { type: 'exp', icon: "C", name: "Car", total: 80 }
        ]
      }
    ]
  },
  methods: {
    // getDailyTotal(item, true) -> return string
    // getDailyTotal(item, false) -> return number
    getDailyTotal: function (item, is_string = false) {
      let sum = 0;
      let prefix = "+";
      item.forEach(element => {
        if (element.type === 'exp') {
          sum = sum - element.total;
        } else {
          sum = sum + element.total;
        }
      });

      if (is_string) {
        if (sum < 0) {
          prefix = '-';
        }

        return prefix + " $ " + Math.abs(sum);
      } else {
        return sum;
      }
    }
  },
});