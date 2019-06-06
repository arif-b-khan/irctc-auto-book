import { combineReducers } from 'redux';
import ticket from './ticketReducer';

const rootReducer = combineReducers({
    ticket
});

export default rootReducer;