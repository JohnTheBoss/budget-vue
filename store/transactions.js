function initialState() {
  return {
    items: []
  };
}

// const state = () => initialState();

let state = () => ({
  ...initialState()
});

const getters = {};

const mutations = {
  addItem(state, item) {
    // TODO: has id? no? create tempID
    // TODO: sync Firebase DB
    state.items.push(item);
  },
  addAll(state, itemArray) {
    state.items = itemArray;
  },
  deleteItem(state, itemID) {
    state.items = state.items.filter(obj => obj.id !== itemID);
  }
};

const actions = {
  async getTransactions(context) {
    const userTransactionsDB = this.$fireDb.ref(
      `transactions/${this.state.auth.authUser.uid}`
    );
    const transactionsItems = await userTransactionsDB.once("value");
    let result = [];
    transactionsItems.forEach(element => {
      result.push({ id: element.key, ...element.val() });
    });
    context.commit("addAll", result);
    result = null;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
