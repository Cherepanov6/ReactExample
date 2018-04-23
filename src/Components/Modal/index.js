import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Checkbox, Select, DatePicker, Button } from 'antd';
import { changeModalVisible, newUser, changeUser } from '../../Actions'  
import moment from 'moment';

const FormItem = Form.Item;
const Init = Form.create();
const Option = Select.Option;
const dateFormat = 'DD.MM.YYYY';

class ModalUser extends Component{

    handleSave = (e)=>{ 
        const { form, changeModalVisible, newUser, changeUser, record} = this.props;       

        form.validateFields(null, (errors, values) => {
            
            if(!errors){
                const values =  form.getFieldsValue();
                if(record){
                    changeUser(values);
                }
                else{
                    newUser(values);
                }
                
                form.resetFields();
                changeModalVisible(false)
            }
        });       
    };


    handleCancel = (e)=>{       
        const { form } = this.props;
        form.resetFields();
        this.props.changeModalVisible(false);
    }

    render(){
        const { changeModalVisible, record } = this.props;

        const modalProps = {
            visible: this.props.visible,
            onOk: this.handleSave,
            onCancel: this.handleCancel
        }

       
        const { getFieldDecorator } = this.props.form;

        return <div>
                <Button onClick={(e)=>{changeModalVisible(true, null)} } style={{marginBottom: 20}}>Новый пользователь</Button>
                <Modal {...modalProps} >
                    <Form>
                        <FormItem style={{display: 'none'}}>
                            {getFieldDecorator('key',  {
                                initialValue: (record) ? record.key : '',
                                rules: [{
                                    required: false, 
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem style={{display: 'none'}}>
                            {getFieldDecorator('id',  {
                                initialValue: (record) ? record.id : '',
                                rules: [{
                                    required: false, 
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label='Имя'>
                            {getFieldDecorator('name',  {
                                initialValue: (record) ? record.name : '',
                                rules: [{
                                    required: true, message: 'Заполните имя сотрудника',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label='Телефон'>
                            {getFieldDecorator('phone', {
                                initialValue: (record) ? record.phone : '',
                                rules: [{
                                    required: true, message: 'Заполните телефон',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label='Дата рождения'>
                            {getFieldDecorator('birthday', {
                                initialValue: (record) ? moment(record.birthday, 'DD.MM.YYYY') : null,
                                rules: [{
                                    required: true, message: 'Заполните дату рождения',
                                }],
                            })(
                                <DatePicker format={dateFormat} />
                            )}
                        </FormItem>
                        <FormItem label='Специальность'>
                            {getFieldDecorator('role', {
                                initialValue: (record) ? record.role : undefined,
                                rules: [{
                                    required: true, message: 'Заполните специальность',
                                }],
                            })(
                                <Select>
                                    <Option value="developer">Разработчик</Option>
                                    <Option value="manager">Контент-менеджер</Option>
                                    <Option value="designer">Дизайнер</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='В архиве'>
                            {getFieldDecorator('inArchive', {
                                initialValue: (record) ? record.inArchive : false,
                                rules: [{
                                    required: false, 
                                }],
                            })(
                                <Checkbox  />
                            )}
                        </FormItem>
                    </Form>
               </Modal>
            </div>
    }
}

export default connect((state)=>({
    visible: state.modalVisible,
    record: state.record
}), { changeModalVisible, newUser, changeUser })(Init(ModalUser));