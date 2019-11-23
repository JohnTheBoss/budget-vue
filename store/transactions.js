export const state = () => ({
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
});

export const mutations = {
  add(state, item) {
    state.items.push(item);
  },
  remove(state, { item }) {
    state.list.splice(state.items.indexOf(item), 1);
  }
};
