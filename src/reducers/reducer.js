import { combineReducers } from 'redux'

import articles from './articles';
import user from './user';
import loading from './loading';
import error from './error';


export default combineReducers({
    articles,
    user,
    loading,
    error
});