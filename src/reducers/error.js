import types from '../actionsTypes';

const error = (state = false, action) => {
    switch (action.type) {
        case types.error:
            return action.error;
      default:
        return state;
    };
};

export default error;