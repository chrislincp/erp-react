import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './index.css';

interface LoginFormProps {
  form?: any;
  [propName: string]: any;
}
class Login extends React.Component<LoginFormProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    sessionStorage.removeItem('admin_token');
  }

  login() {
    sessionStorage.setItem('admin_token', 'login');
    this.props.history.replace('admin/dashboard');
  }
  render() {
    return (
      <Form className="login-form" onSubmit={() => this.login()}>
        <Form.Item>
          <Input 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder="用户名" 
          />
        </Form.Item>
        <Form.Item>
          <Input 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          onClick={() => this.login()}
        >
          Log in
        </Button>
      </Form>
    );
  }
}

export default Form.create()(Login);