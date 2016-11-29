export const fetchAttempt = initialState => Object.assign(
  {},
  initialState,
  { isFetching: true },
);

export const fetchSuccess = (initialState, returnState, result) => Object.assign(
  {},
  initialState,
  returnState,
  {
    isFetched: true,
    isViewRender: true,
    isObjFound: result.exist,
  },
);

export const fetchFailure = state => Object.assign(
  {},
  state,
  { isError: true },
);

export const saveAttempt = state => Object.assign(
  {},
  state,
  { isSaveAttempt: true },
);

export const saveSuccess = state => Object.assign(
  {},
  state,
  {
    isSaveAttempt: false,
    isSaveSuccess: true,
    isViewRender: true,
  },
);

export const saveFailure = state => Object.assign(
  {},
  state,
  { isError: true },
);

export const removeAttempt = state => Object.assign(
  {},
  state,
  { isRemoving: true },
);

export const removeSuccess = initialState => Object.assign(
  {},
  initialState,
  {
    isViewRender: true,
    isRemoved: true,
  },
);

export const removeFailure = state => Object.assign(
  {},
  state,
  { isError: true },
);
