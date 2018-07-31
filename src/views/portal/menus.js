const menus  = [
    {
        key: 'home',
        title: '首页',
        icon: 'home',
        children: [],
        path: '/admin/home'
    },
    { 
        key:'4', 
        title: '测试4', 
        icon: 'appstore',
        path: '/admin/test',
        children: []
    },
    { 
        key:'more', 
        title: '更多', 
        icon: 'appstore',
        path: '/admin/more',
        children: [
            {key: '1', path: '/admin/more/test1', title: '测试1'},
            {key: '2', path: '/admin/more/test2', title: '测试2'},
        ]
    },
];
export default menus;