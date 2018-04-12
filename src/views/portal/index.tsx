import * as React from 'react';
import './index.css';
import menus from './menus';
import MenuBar from './components/MenuBar';
import { Layout, Icon } from 'antd';
import Routers from '../../router';
const { Header, Sider, Content } = Layout;

class Portal extends React.Component {
    state = {
        collapsed: false,
        current: 'home',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleClick = (e: any) => {
        console.log(e);
    }
    componentDidMount() {
        console.log(this.state);
    }
    render() {
        return (
            <div className="portal">
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible={true}
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <div className="portal-sidebar">
                            <MenuBar 
                                menus={menus} 
                                theme="dark"
                                onClick={this.handleClick}
                                style={{ width: '100%', height: '100%' }}
                                defaultSelectedKeys={[this.state.current]}
                                mode="inline"
                            />
                        </div>
                    </Sider>
                
                    <Layout>
                        <Header style={{ height: 50, background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        </Header>
                        <Content style={{ minHeight: 280 }}>
                            <Routers /> 
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Portal;