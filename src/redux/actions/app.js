const PLUS = "counter/PLUS";
const initState = {
  count: 0
}
export default (state = initState, action = {}) => {
  switch (action.type) {
    case PLUS:
      return state.count++
    default:
      return state;
  }
};

export function plus() {
  return {
    type: PLUS
  };
}
