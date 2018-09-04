
const table = {
  state: {
    detail: {},
    detailVisible: false,
  },
  reducers: {
    setDetail(state, detail) {
      return Object.assign({}, state, {detail});
    },
    setDetailVisible(state, visible) {
      return Object.assign({}, state, {detailVisible: visible});
    }
  },
  effects: {

  }
}

export default table;