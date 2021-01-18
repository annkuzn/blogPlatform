import types from '../actionsTypes';

const loading = (state = true, action) => {
    switch (action.type) {
        case types.loading:
            return action.loading;
      default:
        return state;
    };
};

export default loading;