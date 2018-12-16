import * as React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './index.css';
import { LoginService } from '../../services';
import Utils from '../../utils';

interface LoginFormProps {
  form?: any;
  [propName: string]: any;
}

class Login extends React.Component<LoginFormProps, any> {
  constructor(props: any) {
    super(props);
    if (Utils.auth()) {
      props.history.replace('admin/dashboard');
    }
    this.state = {
      username: '',
      password: '',
      lodaing: false,
    };
  }

  onChange(key: string, value: string) {
    this.setState({
      [key]: value,
    });
  }

  loginSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.login();
      }
    });
  }

  login() {
    this.setState({ loading: true });
    const params = {
      username: this.state.username,
      password: this.state.password,
    };
    LoginService.login(params).then(res => {
      this.setState({ loading: false });
      Utils.login('token', res.obj);
      message.success('登录成功');
      this.props.history.replace('admin/dashboard');
    }).catch(error => {
      message.error(error);
      this.setState({ loading: false });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form" onSubmit={e => this.loginSubmit(e)}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名不能为空!' }],
          })(
            <Input 
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="用户名" 
              onChange={e => this.onChange('username', e.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空!' }],
          })(
            <Input 
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              type="password"
              placeholder="密码"
              onChange={e => this.onChange('password', e.target.value)}
            />
          )}
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          loading={this.state.loading}
        >
          登录
        </Button>
      </Form>
    );
  }
}

export default Form.create()(Login);