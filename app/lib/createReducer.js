export default (initialState, handlers) => (
  (state = initialState, action) => {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  }
);
