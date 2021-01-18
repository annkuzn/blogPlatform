import types from '../actionsTypes';

const currentPage = (state = 1, action) => {
    switch (action.type) {
        case types.currentPage:
            return action.currentPage;
      default:
        return state;
    };
};

export default currentPage;