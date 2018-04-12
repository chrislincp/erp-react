import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

interface MenuBarProps {
    menus: any[];
    [propName: string]: any;

}
interface MenuItemProps {
    key: string;
    icon: string;
    path: string;
    title: string;
    [propName: string]: any;
}
class MenuBar extends React.Component<MenuBarProps> {
    constructor(props: MenuBarProps) {
        super(props);
    }
    RenderMenuItem = (menu: MenuItemProps) => {
        return (
        <Menu.Item key={menu.key}>
            <Link to={menu.path}>
                {menu.icon && <Icon type={menu.icon} />}
                <span>{menu.title}</span>
            </Link>
        </Menu.Item>
        );
    }
    RenderSubMenu = (menu: MenuItemProps) => {
        return (
            <Menu.SubMenu 
                key={menu.key} 
                title={<span>{menu.icon && <Icon type={menu.icon} />}<span>{menu.title}</span></span>}
            >
                {menu.children.map((item: MenuItemProps) => {
                    return item.children && item.children.length ?
                        this.RenderSubMenu(item) : this.RenderMenuItem(item); 
                })}
            </Menu.SubMenu>
        );
    }

    render() {
        const { menus, ...props} = this.props;
        return (
            <Menu {...props}>   
                {menus.map(item => {
                    return item.children && item.children.length ? 
                    this.RenderSubMenu(item) : this.RenderMenuItem(item);
                })}
            </Menu>
        );
    }
}

export default MenuBar;