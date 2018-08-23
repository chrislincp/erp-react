import * as React from 'react';
import './index.css';
import menus from '../../router/menus';
import MenuBar from './components/MenuBar';
import { Layout, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';
import Routers from '../../router';
import Tabs from './components/Tabs';
import Utils from '../../utils';
import UserInfo from './components/UserInfo';
const { Header, Sider, Content } = Layout;

class Portal extends React.Component {
    state = {
        collapsed: false,
        selected: ['dashboard'],
        tabs: [{key: 'dashboard', title: '首页'}],
        visible: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleClick = (e: any) => {
        const selected = [e.key];
        if (selected[0] === this.state.selected[0]) {
            return;
        }
        const keyPath = e.keyPath.reverse();
        let tabs: any[] = [];
        keyPath.forEach((key: string) => {
            tabs.push(Utils.recursionKeys(key, menus));
        });
        this.setState({
            selected,
            tabs,
        });
    }

    avatarMenu() {
        return (
            <Menu onClick={e => this.avatarClick(e)}>
                <Menu.Item 
                    key="user"
                >
                    个人中心
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出登录</Menu.Item>
            </Menu>
        );
    }

    avatarClick(e: any) {
        switch (e.key) {
            case 'user':
            this.setState({ visible: true });
            break;
            case 'logout':
            const props: any = this.props;
            props.history.replace('/login');
            break;
            default:

            break;
        }
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
                                selectedKeys={this.state.selected}
                                mode="inline"
                            />
                        </div>
                    </Sider>
                
                    <Layout>
                        <Header 
                            style={{ 
                                height: 50, 
                                background: '#fff', 
                                padding: 0, 
                                lineHeight: '50px', 
                                display: 'flex' ,
                                justifyContent: 'space-between',
                            }}
                        >
                        <div 
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <Tabs style={{lineHeight: '50px'}} tabs={this.state.tabs} />
                        </div>
                        <div
                            style={{
                                marginRight: 20,
                            }}
                        >
                            <Dropdown 
                                overlay={this.avatarMenu()}
                                placement="bottomCenter"
                            >
                                <Avatar size="default" icon="user" />
                            </Dropdown>
                        </div>
                        </Header>
                        <Content style={{ minHeight: 280 }}>
                            <Routers /> 
                        </Content>
                    </Layout>
                </Layout>

                <Modal 
                    visible={this.state.visible}
                    title="个人中心"
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <UserInfo />
                </Modal>
            </div>
        );
    }
}

export default Portal;