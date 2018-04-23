import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Select } from 'antd';
import { filterData, changeFilter } from '../../Actions'

const Option = Select.Option;


const SelectAfter = (filterType, changeFilter) =><Select style={{minWidth: 130}} defaultValue={filterType} onChange={(value)=>changeFilter(value)} >                        
                                                    <Option value="name">Имя</Option>
                                                    <Option value="phone">Телефон</Option>
                                                    <Option value="birthday">Дата рождения</Option>                        
                                                </Select>

class TableFilter extends Component {   
    render(){
        const { filterType, changeFilter, filterData } = this.props;
        return <Input addonAfter={SelectAfter(filterType, changeFilter)} onChange={(e)=>filterData(e.target.value, filterType)} />        
    }
}

export default connect((state)=>({
    filterType: state.filterType
}),{filterData, changeFilter})(TableFilter);