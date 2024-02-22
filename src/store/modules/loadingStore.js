const loadingStore = {
    namespaced: true,
    state: {
      loading: false
    },
    getters: {
      getLoading: (state) => state.loading
    },
    mutations: {
      setLoading(state, data) {
        state.loading = data;
      }
    },
    actions: {
      openLoading(context) {
        context.commit("setLoading", true);
      },
      closeLoading(context) {
        context.commit("setLoading", false);
      }
    }
  };
  
  export default loadingStore;
  