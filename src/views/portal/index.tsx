import * as React from 'react';
import './index.css';
import menus from './menus';
import MenuBar from './components/MenuBar';
import { Layout, Icon } from 'antd';
import Routers from '../../router';
import Tabs from './components/Tabs';
const { Header, Sider, Content } = Layout;

class Portal extends React.Component {
    state = {
        collapsed: false,
        selected: [],
        tabs: [],
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
        this.initSelected(this.props);
    }

    componentWillReceiveProps(nextProps: any) {
        this.initSelected(nextProps);   
    }
    initSelected(props: any) {
        let selected = '';
        let tabs = new Array();
        menus.forEach(menu => {
            if (props.location.pathname.includes(menu.path)) {
                tabs.push(menu);
                menu.children.forEach(child => {
                    if (props.location.pathname.includes(child.path)) {
                        tabs.push(child);
                    }
                });
            }
            if (menu.path === props.location.pathname) {
                selected = menu.key;
            } else {
                menu.children.forEach(child => {
                    if (child.path === props.location.pathname) {
                        selected = child.key;
                    }
                });
            }
        });
        const dashboard = [{
            key: 'dashboard',
            path: '/admin/dashboard',
            title: 'Dashboard',
        }];
        tabs = dashboard.concat(tabs);
        this.setState({selected: [selected], tabs});
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
                                display: 'flex' 
                            }}
                        >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Tabs style={{lineHeight: '50px'}} tabs={this.state.tabs} />
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