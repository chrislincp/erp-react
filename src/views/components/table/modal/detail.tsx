import * as React from 'react';
import { Form, Input, Radio, DatePicker, InputNumber } from 'antd';
import store from '../../../../store';
import * as moment from 'moment';

interface DetailProps {
  form: any;
  [propName: string]: any;
}
class Detail extends React.Component<DetailProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: store.getState().table.detail,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
    };
  }

  onChangeDetail(key: string, value: any) {
    let { detail } = this.state;
    detail[key] = value;
    switch (key) {
      case 'birth':
      detail.birth = value;
      detail.age = moment().year() - moment(value).year();
      break;
      default:
      detail[key] = value;
      break;
    }
    this.setState({ detail });
    store.dispatch.table.setDetail(detail);
}

  render() {
    const {formItemLayout, detail} = this.state;
    // const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="姓名" {...formItemLayout} required={true}>
          <Input value={detail.name} onChange={e => this.onChangeDetail('name', e.target.value)} />
        </Form.Item>
        <Form.Item label="性别" {...formItemLayout}>
          <Radio.Group value={detail.sex} onChange={e => this.onChangeDetail('sex', e.target.value)}>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="生日" {...formItemLayout}>
          <DatePicker 
            value={detail.birth ? moment(detail.birth, 'YYYY-MM-DD') : detail.birth}
            format="YYYY-MM-DD"
            onChange={(date, dateString) => this.onChangeDetail('birth', dateString)}
            disabledDate={(current) => current > moment().endOf('day')}
          />
        </Form.Item>
        <Form.Item label="年龄" {...formItemLayout}>
          <InputNumber 
            value={detail.age} 
            onChange={num => this.onChangeDetail('age', num)}
          />
        </Form.Item>
        <Form.Item label="地址" {...formItemLayout}>
          <Input.TextArea 
            value={detail.addr} 
            onChange={e => this.onChangeDetail('addr', e.target.value)}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Detail);