export const FILTER_DATA = 'FILTER_DATA';
export const CHANGE_FILTER = "CHANGE_FILTER";
export const DEFAULT_ACTION = 'DEFAULT_ACTION';
export const CHANGE_USER = 'CHANGE_USER';
export const MODAL_VISIBLE = 'MODAL_VISIBLE';
export const NEW_USER = 'NEW_USER';

export function changeFilter(newFilterType){
       return {
        type: CHANGE_FILTER,
        payload: newFilterType
    }
}

export function changeModalVisible(visible, record){
    return {
        type: MODAL_VISIBLE,
        payload: {  modalVisible: visible, record } 
    }
}

export function newUser(userData){
    userData.birthday = userData.birthday.format('DD.MM.YYYY');
   // console.log(' newUser  userData',  userData)
    return (dispatch, getState)=>{
        const oldData = getState().data;
        fetch('https://api2.esetnod32.ru/frontend/test/?name='+userData.name+'&phone='+userData.phone+'&birthday='+userData.birthday+'&kakaha='+ +new Date())
                .then(response=>response.json())
                .then(body=>{  
                    if(body.success){
                        const newUserData = {key: body.data.id, id: body.data.id, ...userData};
                        let newData = oldData.slice(0);
                        newData.push(newUserData)                       
                        dispatch({
                            type: NEW_USER,
                            payload: {newData, modalVisible: false}
                        })
                    }
                    else{                                          
                        throw new Error(body.error.code + ' : ' + body.error.description); 
                    } 
                })
                .catch((err)=>{ alert(err); console.log(err) })

    }
}

export function changeUser(userData){
    return (dispatch, getState) => {

        userData.birthday = userData.birthday.format('DD.MM.YYYY');

        const newData = getState().data.map((item)=>(item.key === userData.key)? userData : item );
        
        dispatch({
            type: CHANGE_USER,
            payload: {
                data: newData,
                tabData: newData
            }
        })
    }
}


export function filterData(str, param){    
    return (dispatch, getState) => {
       
        dispatch({
            type: FILTER_DATA,
            payload: (str === '')
                        ? 
                        getState().data 
                        : 
                        getState().data.filter(function(item){
                            switch(param){                    
                                case 'phone': return !!~item.phone.indexOf(str); break;
                                case 'birthday': return !!~item.birthday.indexOf(str); break; 
                                case 'name': 
                                default: return !!~item.name.indexOf(str); break;                   
                            }
                        })
        })
    }
}

