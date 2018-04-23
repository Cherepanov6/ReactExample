

import {
    DEFAULT_ACTION,
    FILTER_DATA,
    CHANGE_FILTER,
    CHANGE_USER,
    MODAL_VISIBLE,
    NEW_USER
} from '../Actions'



export default (state, action = {type: DEFAULT_ACTION})=>{

    const {type, payload} = action;
   
    switch(type){
        case CHANGE_FILTER: return {...state, filterType: payload }; break;
        case FILTER_DATA: return {...state, tabData: payload}; break;
        case CHANGE_USER: return {...state, ...payload, record: null}; break; 
        case MODAL_VISIBLE: return {...state, ...payload}; break;
        case NEW_USER: return {...state, data: payload.newData, tabData: payload.newData, modalVisible: payload.modalVisible }
        case DEFAULT_ACTION: 
        default: return {...state};
    }
    
}