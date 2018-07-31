import * as React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface TabsProps {
  style: any;
  tabs: any[];
  [propName: string]: any;

}

class Tabs extends React.Component<TabsProps> {
  constructor(props: TabsProps) {
    super(props);
  }

  render() {
    const {tabs, style} = this.props;
    return (
      <Breadcrumb style={style} >
        {tabs.map((menu, index) => (
          <Breadcrumb.Item key={menu.key}>
          {index === tabs.length - 1 ? 
          <span>{menu.title}</span> : 
          <Link to={menu.path}>
                <span>{menu.title}</span>
            </Link>}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export default Tabs;