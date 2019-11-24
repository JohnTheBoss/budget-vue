<template>
  <div>
    <Header>
      <div class="top">
        <span class="small">{{$t('balance')}}</span>
        <h1>{{ formatMoney(currentMoney) }}</h1>
      </div>
      <div class="body">
        <budgetChart :chartData="renderBalanceChartData" :options="renderBalanceChartOptions"></budgetChart>
      </div>
    </Header>
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

      <div>
        {{$t('transactions')}}
        <div class="transactions">
          <div
            class="transaction"
            v-for="(item, index) in getTransactions"
            v-bind:key="'trans_'+index"
          >
            <div class="category"></div>
            <div class="content">{{item.name}}</div>
            <div class="info">
              <div class="total">{{formatMoney(item.total)}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import budgetChart from "~/components/budgetChart";
export default {
  middleware: ["auth"],
  components: {
    Header,
    budgetChart
  },
  head: function() {
    return {
      title: "Dashboard"
    };
  },
  data: function() {
    return {
      newItem: {
        date: "",
        name: "",
        total: ""
      }
    };
  },
  methods: {
    addNewItem: function() {
      this.$store.commit("transactions/add", this.newItem);
      this.newItem = {
        date: "",
        name: "",
        total: ""
      };
    },
    formatMoney: function(m) {
      return new Intl.NumberFormat(this.$i18n.locale, {
        style: "currency",
        currency: this.$i18n.t("currency")
      }).format(m);
    }
  },
  computed: {
    items: function() {
      return this.$store.state.transactions.items;
    },
    getTransactions: function() {
      const orign = JSON.parse(JSON.stringify(this.items));
      return orign.sort((a, b) =>
        a.date < b.date
          ? 1
          : a.date === b.date
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
    },
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