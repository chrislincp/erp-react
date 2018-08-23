import * as React from 'react';
import { Breadcrumb } from 'antd';

interface TabsProps {
  tabs: any[];
  style: any;
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
        {tabs.map(tab => (
          <Breadcrumb.Item key={tab.key}>
            {tab.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export default Tabs;