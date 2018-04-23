import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table as AntTable} from 'antd';
import { changeModalVisible } from '../../Actions'
//import ChangeUser from '../Modal'


class Table extends Component{
    state ={
        filters: null
    }

    handleChange = (pagination, cFilters, sorter) => this.setState({filters: cFilters});

    render(){
        const dataSource = this.props.dataSource;  

        const filterInfo = this.state.filters;

        const columns = [{
            title: '',
            dataIndex: 'id',
            key: 'id',
            rowKey: 'id',
            
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => (a.name > b.name) ? 1 : -1
    
           
        },
        {
            title: 'Тел',
            dataIndex: 'phone',
            key: 'phone',
           
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthday',
            key: 'birthday',
            sorter: (a, b) =>{
                let aTextDate = a.birthday.split('.'), 
                    bTextDate = b.birthday.split('.');
                let aDate = new Date(aTextDate[2], aTextDate[1], aTextDate[0]), 
                    bDate = new Date(bTextDate[2], bTextDate[1], bTextDate[0])
                return aDate - bDate;
            } 
            
        },
        {
            title: 'Специальность',   
            rowKey: 'role', 
            dataIndex: 'role',
            filters: [
                {text: 'Разработчик', value: 'developer'},
                {text: 'Контент-менеджер', value: 'manager'},
                {text: 'Дизайнер', value: 'designer'},
            ],
            filteredValue: (filterInfo && filterInfo.role) || null,
            onFilter: (value, record) => record.role.includes(value),        
            render: (text, row) => {              
                let role = "";              
                switch(row.role){
                    case 'developer': role = "Разработчик"; break;
                    case 'manager': role = "Контент-менеджер"; break;
                    case 'designer': role = "Дизайнер"; break;
                    default: role = "Соискатель"; break;
                }
    
                return <p>{role}</p>
            }
        }];

        const tprops = {
            pagination: false,
            dataSource,
            columns
        }
        
        return <AntTable {...tprops} 
                         onChange={this.handleChange} 
                         onRow={(record, index)=>({onClick: (e)=>{ this.props.changeModalVisible(true, record) } })} 
                         />
    }
}

export default connect((state)=>({dataSource: state.tabData}), { changeModalVisible })(Table);