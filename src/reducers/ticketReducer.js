import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ticketReducer(state=initialState, action){
    switch (action.type) {
        case types.LOAD_TICKETS:
            return state;
        default:
            return state;
            break;
    }
}