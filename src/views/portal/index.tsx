import * as React from 'react';
import './index.css';
import menus from '../../router/menus';
import MenuBar from './components/MenuBar';
import { Layout, Icon } from 'antd';
import Routers from '../../router';
import Tabs from './components/Tabs';
const { Header, Sider, Content } = Layout;

class Portal extends React.Component {
    state = {
        collapsed: false,
        selected: ['dashboard'],
        tabs: [],
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleClick = (e: any) => {
        const selected = [e.key];
        const keyPath = e.keyPath.reverse();
        this.recursionKeys(keyPath);
        this.setState({
            selected,
        });
    }

    recursionKeys(keyPath: any[]) {
        console.log(keyPath);
    }

    initTabs(item: any) {
        let tabs: any[] = this.state.tabs;
        let exsit = false;
        tabs.forEach(tab => {
            if (tab.key === item.key) {
                exsit = true;
            }
        });
        if (!exsit) {
            tabs.push(item);
        }
        this.setState({tabs});
    }

    onCloseTab(tab: any) {
        const props: any = this.props;
        let tabs: any[] = this.state.tabs;
        let index: number = 0;
        let newPath = props.history.location.pathname;
        tabs.forEach((item, i) => {
            if (item.key === tab.key) {
                index = i;
            }
        });
        if (tabs[index].path === newPath) {
            if (index === tabs.length - 1) {
                if (index === 0) {
                    newPath = 'admin/dashboard';
                } else {
                    newPath = tabs[index - 1].path;
                }
            } else {
                newPath = tabs[index + 1].path;
            }
        }
        tabs.splice(index, 1);
        props.history.push(newPath);
        this.setState({
            tabs,
        });
    }

    render() {
        const props: any = this.props;
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
                        <Tabs 
                            style={{lineHeight: '50px'}} 
                            tabs={this.state.tabs} 
                            history={props.history} 
                            onClose={(tab: any) => this.onCloseTab(tab)}
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