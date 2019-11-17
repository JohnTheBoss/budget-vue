<template>
  <div>
    <div class="header">
      <div class="top">
        <div class="left">
          <div class="locale-changer">
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
            </select>
          </div>
        </div>
        <div class="center">BUDGET-APP</div>
        <div class="right"></div>
      </div>

      <div class="headerBox">
        <div class="top">
          <span class="small">{{$t('balance')}}</span>
          <h1>{{ formatMoney(currentMoney) }}</h1>
        </div>
        <div class="body">
          <budgetChart :chartData="renderBalanceChartData" :options="renderBalanceChartOptions"></budgetChart>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div>
        {{$t('monthly_overview')}}
        <div class="row">
          <div class="box w-50 align-items-center">
            <span class="small">{{$t('monthly_expenses')}}</span>
            <h2>{{ formatMoney(totalExp) }}</h2>
          </div>
          <div class="box w-50 align-items-center">
            <span class="small">{{$t('monthly_income')}}</span>
            <h2>{{ formatMoney(totalInc) }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import budgetChart from "@/components/budgetChart";
export default {
  name: "AppHome",
  components: {
    budgetChart
  },
  data: function() {
    return {
      newItem: {
        date: "",
        name: "",
        total: ""
      },
      langs: Object.keys(this.$i18n.messages),
      items: [
        { date: "2019-11-01", name: "Work", total: "5000" },
        { date: "2019-11-01", name: "Cinema", total: "-2000" },
        { date: "2019-11-02", name: "Work", total: "1490" },
        { date: "2019-11-03", name: "Petrol", total: "-383" },
        { date: "2019-11-03", name: "Bill", total: "-1329" },
        { date: "2019-11-05", name: "Work", total: "4000" },
        { date: "2019-11-06", name: "Work", total: "1480" },
        { date: "2019-11-07", name: "Restaurant", total: "-3482" },
        { date: "2019-11-14", name: "Shop", total: "-1594" }
      ]
    };
  },
  methods: {
    addNewItem: function() {
      this.items.push(this.newItem);
      this.newItem = {
        date: "",
        name: "",
        total: ""
      };
    },
    formatMoney: function(m) {
        return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: this.$i18n.t('currency') }).format(m);
    }
  },
  computed: {
    currentMoney: function() {
      return Object.values(this.items).reduce(
        (t, { total }) => parseInt(t) + parseInt(total),
        0
      );
    },
    BalanceChartLabels: function() {
      let dates = [];
      this.items.forEach(e => {
        if (!dates.includes(e.date)) {
          dates.push(e.date);
        }
      });
      return dates;
    },
    renderBalanceChartData: function() {
      return {
        labels: this.BalanceChartLabels,
        datasets: [
          {
            label: "Egyenleg",
            borderColor: "#4C62FF",
            borderWidth: "2",
            showLine: true,
            backgroundColor: "#E9EEFF",
            data: this.BalanceChartData
          }
        ]
      };
    },
    renderBalanceChartOptions: function() {
      return {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value, index, values) => {
                  return this.formatMoney(value);
                }
              }
            }
          ]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              return this.formatMoney(tooltipItems.yLabel);
            }
          }
        }
      };
    },
    BalanceChartData: function() {
      let dates = this.BalanceChartLabels;
      let dalySum = [];

      let beforeDay = 0;

      dates.forEach(e => {
        let all = this.items.filter(item => item.date == e);
        let today = all.reduce(
          (t, { total }) => parseInt(t) + parseInt(total),
          0
        );
        dalySum.push(beforeDay + today);
        beforeDay += today;
      });

      return dalySum;
    },
    totalExp: function() {
      return this.items
        .filter(({ total }) => parseInt(total) < 0)
        .reduce((sum, { total }) => sum + parseInt(total), 0);
    },
    totalInc: function() {
      return this.items
        .filter(({ total }) => parseInt(total) > 0)
        .reduce((sum, { total }) => sum + parseInt(total), 0);
    }
  }
};
</script>

<style scoped>
</style>