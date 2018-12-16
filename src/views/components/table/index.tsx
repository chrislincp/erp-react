import * as React from 'react';
import { UsersService } from '../../../services';
import { Layout, Table, message, Button, Form, Input, Modal, Pagination } from 'antd';
import Utils from '../../../utils';
import Detail from './modal/detail';
import store from '../../../store';
import * as moment from 'moment';

const { Header, Content, Footer } = Layout;
interface UsersTableProps {
    [propName: string]: any;
}

export default class UsersTable extends React.Component<UsersTableProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            loading: false,
            data: [],
            page: 1,
            size: 20,
            total: 0,
            searchForm: {
                name: '',
            },
            visible: false,
            saveLoading: false,
            detail: {},
            detailType: 'add',
        };
    }
    componentDidMount() {
        const {name, page, size} = this.state;
        this.getUsersList(name, page, size);
    }

    onchangeSearchForm(key: string, value: any) {
        let {searchForm} = this.state;
        searchForm[key] = value;
        this.setState({ searchForm });
    }

    search(e: any) {
        e.preventDefault();
        this.setState({ name: Utils.trim(this.state.searchForm.name), page: 1 });
        this.getUsersList(Utils.trim(this.state.searchForm.name), 1, this.state.size);
    }

    getUsersList(name: string, page: number, size: number) {
        this.setState({ loading: true });
        const params = {
            page,
            size,
            name,
        };
        UsersService.getTableList(params).then(res => {
            this.setState({ loading: false, data: res.obj.rows, total: res.obj.total });
        }).catch(err => {
            message.error(err);
            this.setState({ loading: false });
        });
    }

    onChangeSize(current: number, pageSize: number) {
        this.setState({
            page: 1,
            size: pageSize,
        });
        setTimeout(() => {
            this.getUsersList(this.state.name, 1, pageSize);
        });
    }

    onChangePage(page: number) {
        this.setState({ page });
        this.getUsersList(this.state.name, page, this.state.size);  
    }

    convertTable(key: string, text: any, record: any, index: number) {
        switch (key) {
            case 'sex':
            return <div>{text === 1 ? '男' : '女'}</div>;
            case 'opreate':
            return (
                <div>
                    <Button 
                        size="small" 
                        type="primary"
                        onClick={() => this.openDetail(record, 'edit')}
                        style={{
                            marginRight: 10
                        }}
                    >
                        编辑
                    </Button>
                    <Button 
                        size="small" 
                        type="danger"
                        onClick={() => this.onDelete(record.id)}
                    >
                        删除
                    </Button>
                </div>
            );
            default:
            return <div>{text}</div>;
        }
    }

    onDelete(id: string) {
        Modal.confirm({
            title: '删除',
            content: '确认删除该用户？',
            onOk: () => {
                return new Promise((resolve, reject) => {
                    const params = { id };
                    UsersService.deleteUser(params).then(res => {
                        message.success('删除成功');
                        this.setState({ page: 1 });
                        resolve();
                        this.getUsersList(this.state.name, 1, this.state.size);
                    }).catch(err => {
                        message.error(err);
                        reject();
                    });
                });
            },
            okText: '确定',
            cancelText: '取消',
            
        });
    } 

    deleteUser(id: string) {
        const params = { id };
        UsersService.deleteUser(params).then(res => {
            message.success('删除成功');
            this.setState({ page: 1 });
            this.getUsersList(this.state.name, 1, this.state.size);
        }).catch(err => {
            message.error(err);
        });
    }

    openDetail(row: object, type: string) {
        const detail = Object.assign({}, row);
        store.dispatch.table.setDetail(detail);
        this.onChangeVisible(true);
        this.setState({ detailType: type });
    }
    onChangeVisible(val: boolean) {
        this.setState({visible: val});
    }

    save() {
        this.setState({
            saveLoading: true,
        });
        const params = Object.assign({}, store.getState().table.detail);
        let service = '';
        switch (this.state.detailType) {
            case 'add':
            service = 'addUser';
            break;
            case 'edit':
            service = 'saveUserInfo';
            break;
            default:
            break;
        }
        UsersService[service](params).then((res: any) => {
            this.setState({
                saveLoading: false,
                visible: false,
                page: 1,
            });
            this.getUsersList(this.state.name, 1, this.state.size);
            message.success(res.msg);
        }).catch((err: any) => {
            message.error(err);
            this.setState({ saveLoading: false });
        });
    }

    onAddUser() {
        const row = {
            name: '',
            sex: 1,
            age: 0,
            birth: moment().format('YYYY-MM-DD'),
            addr: '',
        };
        this.openDetail(row, 'add');
    }

    render() {
        const {page, size, total, loading, data, saveLoading, visible} = this.state;
        const column = [
            {
                title: '姓名', 
                dataIndex: 'name', 
                key: 'name', 
                align: 'center',
                 width: 100
            },
            {
                title: '性别', 
                dataIndex: 'sex', 
                key: 'sex',  
                align: 'center', 
                width: 100, 
                render: (text: any, record: any, index: number) => this.convertTable('sex', text, record, index)
            },
            {title: '年龄', dataIndex: 'age', key: 'age',  align: 'center', width: 100},
            {title: '生日', dataIndex: 'birth', key: 'birth',  align: 'center', width: 100},
            {title: '地址', dataIndex: 'addr', key: 'addr',  align: 'center'},
            {
                title: '操作', 
                dataIndex: 'opreate', 
                key: 'opreate',  
                align: 'center',
                width: 180,
                render: (text: any, record: any, index: number) => this.convertTable('opreate', text, record, index),
            },
        ];
        return (
            <Layout style={{display: 'flex'}}>
                <Header
                    style={{
                        backgroundColor: 'transparent',
                        height: 50,
                        lineHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Form layout="inline" onSubmit={e => this.search(e)}>
                        <Form.Item>
                            <Input 
                                placeholder="请输入姓名" 
                                onChange={e => this.onchangeSearchForm('name', e.target.value)} 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => this.onAddUser()}>新增</Button>
                        </Form.Item>
                    </Form>
                </Header>
                <Content style={{flex: 1, overflow: 'auto'}}>
                    <Table 
                        style={{backgroundColor: 'white'}}
                        size="small"
                        rowKey="id"
                        loading={loading}
                        dataSource={data}
                        columns={column}
                        pagination={false}
                        locale={{
                            emptyText: '暂无数据',
                        }}
                        onRow={(record) => {
                            return {
                              onDoubleClick: () => this.openDetail(record, 'edit'),
                            };
                        }}
                    />                   
                </Content>

                <Footer style={{backgroundColor: 'white'}}>
                    <Pagination
                        total={total}
                        showSizeChanger={true}
                        current={page}
                        pageSize={size}
                        onShowSizeChange={(current, pageSize) => this.onChangeSize(current, pageSize)}
                        onChange={(pageNumber) => this.onChangePage(pageNumber)}
                        showTotal={(tot) => `共${tot}条`}
                    />
                </Footer>
            
                <Modal
                    visible={visible} 
                    destroyOnClose={true}
                    onCancel={() => this.onChangeVisible(false)}
                    title="详情"
                    cancelText="取消"
                    okText="保存"
                    onOk={() => this.save()}
                    confirmLoading={saveLoading}
                >
                    <Detail />
                </Modal>
            </Layout>
        );
    }
}
