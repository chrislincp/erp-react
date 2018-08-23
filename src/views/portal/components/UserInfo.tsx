import * as React from 'react';
import { Spin } from 'antd';

class UserInfo extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    return (
      <div>
        <Spin spinning={this.state.loading} delay={1000}>
          this is user info
        </Spin>
      </div>
    );
  }
}

export default UserInfo;