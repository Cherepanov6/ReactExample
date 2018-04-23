import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers' 
import jsonData from '../Data/users.json'

let data = jsonData.map((item)=>Object.assign({key: item.id}, item));

const initialState = {
    data,
    tabData: data,
    filterType: 'name',
    modalVisible: false,
    record: null
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default createStore( reducer, 
                            initialState,  
                            composeEnhancers(
                                applyMiddleware(thunk)
                            )
                        );

