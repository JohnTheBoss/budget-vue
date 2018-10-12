let ionicons = [
  "airplane", "american-football",
  "logo-android", "logo-apple",
  "baseball", "basket",
  "bed", "beer",
  "bicycle", "boat",
  "book", "bowtie",
  "bug", "build",
  "bus", "business",
  "cafe", "calendar",
  "call", "camera",
  "car", "card",
  "cart", "cash",
  "color-palette", "compass",
  "construct", "cube",
  "cut", "logo-dropbox",
  "logo-euro", "film",
  "fitness", "flask",
  "folder", "folder-open",
  "logo-game-controller-a", "logo-game-controller-b",
  "gift", "glasses",
  "globe", "grid",
  "hammer", "headset",
  "heart", "home",
  "ice-cream", "images",
  "infinite", "key",
  "laptop", "leaf",
  "lock", "mail",
  "map", "medal",
  "medical", "medkit",
  "megaphone", "microphone",
  "moon", "musical-notes",
  "navigate", "notifications",
  "paper", "paw",
  "pint", "pizza",
  "logo-playstation", "print",
  "pulse", "radio",
  "restaurant", "rose",
  "school", "settings",
  "shirt", "logo-skype",
  "snow", "logo-steam",
  "subway", "sunny",
  "tablet-portrait", "tennisball",
  "text", "time",
  "today", "train",
  "trash", "trending-down",
  "trending-up", "trophy",
  "tv", "umbrella",
  "usd", "wallet",
  "watch", "water", "logo-windows",
  "wine", "logo-xbox",
  "logo-yen", "logo-youtube"
];

let app = new Vue({
  el: 'main#app',
  data: {
    newItemData: {
      dateType: 'today',
      manualDate: '',
      itemName: '',
      selectedIcon: null,
      type: '',
      amount: ''
    },
    ionicons: ionicons,
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
      },
      {
        date: moment("2018-08-22"), item: [
          { type: 'exp', icon: "R", name: "Restaurant", total: 85 }
        ]
      },
      {
        date: moment("2018-08-10"), item: [
          { type: 'inc', icon: "W", name: "Work", total: 150 }
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
    },
    updateHeader: function () {
      // First Clear
      this.$data.income = 0;
      this.$data.expense = 0;

      this.$data.dailyBudge.forEach(element => {
        element.item.forEach(dailyitem => {
          if (dailyitem.type === 'inc') {
            this.$data.income += dailyitem.total;
          } else {
            this.$data.expense += dailyitem.total;
          }
        });
      });
    },
    // getHeaderTotal(true) -> return string
    // getHeaderTotal(false) -> return number
    getHeaderTotal: function (is_string = false) {
      let prefix = '+';
      let total = this.$data.income - this.$data.expense;

      if (is_string) {
        if (total < 0) {
          prefix = '-';
        }
        return prefix + " $ " + Math.abs(total);
      } else {
        return total;
      }
    },
    getIconClass: function (icon) {
      if (icon.includes('logo-')) {
        return 'icon ion-' + icon;
      } else {
        return 'icon ion-ios-' + icon;
      }
    },
    addNewItem: function () {
      alert('RUN');
    }
  },
});

app.updateHeader();


// Get the modal
var modal = document.getElementById('addItem');
var btn = document.getElementById("addItemBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function formatIconSelect(icon) {
  if (!icon.id) { return icon.text; }

  let type = "ios-"
  if (icon.element.value.includes('logo-')) {
    type = "";
  }
  let $icon = $(
    '<span><i class="icon ion-' + type + icon.element.value + '"/> ' + icon.text + '</span>'
  );
  return $icon;
}

$('#iconSelect').select2({
  width: "100%",
  templateResult: formatIconSelect
}).on('change', function () {
  app.$data.selectedIcon = this.value;
});