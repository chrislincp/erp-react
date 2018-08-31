import More from "../views/more";
import Dashboard from "../views/dashboard";
import Login from "../views/login";
import NotFound from "../views/NotFound";
import Table from "../views/components/table";
const menus  = [
    {
        key: 'login',
        title: '登录',
        path: '/login',
        component: Login,
        hidden: true,
    },
    {
        key: '404',
        title: '404',
        path: '/404',
        component: NotFound,
        hidden: true,
    },
    {
        key: 'dashboard',
        title: '首页',
        icon: 'home',
        path: '/admin/dashboard',
        component: Dashboard,
    },
    {
        key: 'components',
        title: '组件',
        icon: 'appstore',
        path: '/admin/components',
        children: [
            { 
                key:'table', 
                title: 'Table', 
                path: '/admin/components/table',
                component: Table,
            },
        ]
    }, 
    { 
        key:'more', 
        title: '更多', 
        icon: 'appstore',
        path: '/admin/more',
        children: [
            {
                key: 'test1', 
                path: '/admin/more/test1', 
                title: '测试1', 
                children: [
                    {
                        key: 'test1-1', 
                        path: '/admin/more/test1/test1-1', 
                        title: '测试1-1', 
                        children: [
                            {
                                key: 'test1-1-1',
                                path: '/admin/more/test1/test1-1/test1-1-1',
                                title: '测试1-1-1',
                                component: More.Test1,
                            },
                            {
                                key: 'test1-1-2',
                                path: '/admin/more/test1/test1-1/test1-1-2',
                                title: '测试1-1-2',
                                component: More.Test2,
                            },
                        ]
                    }
                ]
            },
            {
                key: 'test3', 
                path: '/admin/more/test3', 
                title: '测试3',
                component: More.Test3
            },
        ],
    },
];
export default menus;