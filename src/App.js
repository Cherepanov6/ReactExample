import React, { Component } from 'react';
import Table from './Components/Table';
import TableFilter from './Components/TableFilter'
import ModalUser from './Components/Modal'
import { Provider } from 'react-redux';
import store from './Store'
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import { ruRu } from 'antd/lib/locale-provider/ru_RU';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={ruRu}>
          <div>                       
            <div style={{padding: 40}}>
              <ModalUser /> 
              <TableFilter />
            </div>
            <Table />            
          </div>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
