import types from '../actionsTypes';

const initialState = {
    userData: null,
    isLogin: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.user:
            return {...state, userData: action.user};
        case types.isLogin:
            return {...state, isLogin: action.isLogin};
      default:
        return state;
    };
};

export default user;