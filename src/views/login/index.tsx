/**
 * Created by hao.cheng on 2017/4/16.
 */
import * as React from 'react';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';

// const FormItem = Form.Item;

export default class Login extends React.Component {
    // componentWillMount() {
    //     const { receiveData } = this.props;
    //     receiveData(null, 'auth');
    // }
    // componentWillReceiveProps(nextProps) {
    //     const { auth: nextAuth = {} } = nextProps;
    //     const { history } = this.props;
    //     if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
    //         localStorage.setItem('user', JSON.stringify(nextAuth.data));
    //         history.push('/');
    //     }
    // }
    // componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
    //     const { auth: nextAuth = {}, history } = this.props;
    //     // const { history } = this.props;
    //     if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
    //         localStorage.setItem('user', JSON.stringify(nextAuth.data));
    //         history.push('/');
    //     }
    // }
    handleSubmit = (e: any) => {
        e.preventDefault();
        // const {form: any} = this.props;
        // form.validateFields((err: any, values: any) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //         const { fetchData } = this.props;
        //         if (values.userName === 'admin' && values.password === 'admin') {
        //           fetchData({funcName: 'admin', stateName: 'auth'});
        //         }
        //         if (values.userName === 'guest' && values.password === 'guest') {
        //           fetchData({funcName: 'guest', stateName: 'auth'});
        //         }
        //     }
        // });
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                </div>
            </div>

        );
     }
}