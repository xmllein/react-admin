import Mock from 'mockjs'
export default () => {
  return [
    {
      url: '/api/user/getUserInfo',
      method: 'get',
      response: ({ body, query }: any) => {
        console.log('body>>>>>>>>', body)
        console.log('query>>>>>>>>', query)

        return {
          code: 0,
          data: {
            _id: '12345678',
            userId: 12345678,
            userName: 'admin',
            userEmail: 'admin@admin.com',
            mobile: '',
            deptId: '',
            deptName: '',
            job: '',
            state: 1,
            role: 1,
            roleList: [],
            createId: 1000002,
            userImg: '',
          },
          msg: '',
        }
      },
    },
    {
      url: '/api/user/getPermissionList',
      method: 'get',
      response: ({ body, query }: any) => {
        console.log('body>>>>>>>>', body)
        console.log('query>>>>>>>>', query)

        return {
          code: 0,
          data: {
            menuList: [
              {
                _id: '12345678',
                menuType: 1,
                menuName: '系统管理',
                icon: 'SettingOutlined',
                orderBy: 1,
                menuState: 1,
                parentId: '',
                createId: 12345678,
                createTime: '',
                updateTime: '',
                __v: 0,
                children: [
                  {
                    _id: '64b9d75464d7e29e5d44a18e',
                    menuType: 1,
                    menuName: '用户管理',
                    icon: 'TeamOutlined',
                    orderBy: 1,
                    menuState: 1,
                    parentId: '64b9d73b64d7e29e5d44a18a',
                    createId: 1000339,
                    createTime: '2023-07-03T07:49:23.392Z',
                    updateTime: '2023-07-21T00:55:26.102Z',
                    __v: 0,
                    path: '/userList',
                    children: [
                      {
                        _id: '64b9db4764d7e29e5d44a220',
                        menuType: 2,
                        menuName: '查看',
                        menuCode: 'user@list',
                        orderBy: 0,
                        menuState: 1,
                        parentId: '64b9d75464d7e29e5d44a18e',
                        createId: 1000339,
                        createTime: '2023-07-03T07:49:23.392Z',
                        updateTime: '2023-07-21T02:44:51.037Z',
                        __v: 0,
                      },
                      {
                        _id: '64b9f15e64d7e29e5d44a466',
                        menuType: 2,
                        menuName: '新增',
                        menuCode: 'user@create',
                        orderBy: 1,
                        menuState: 1,
                        parentId: '64b9d75464d7e29e5d44a18e',
                        createId: 1000339,
                        createTime: '2023-07-03T07:49:23.392Z',
                        updateTime: '2023-07-03T07:49:23.392Z',
                        __v: 0,
                      },
                    ],
                    buttons: [
                      {
                        _id: '64b9db4764d7e29e5d44a220',
                        menuType: 2,
                        menuName: '查看',
                        menuCode: 'user@list',
                        orderBy: 0,
                        menuState: 1,
                        parentId: '64b9d75464d7e29e5d44a18e',
                        createId: 1000339,
                        createTime: '2023-07-03T07:49:23.392Z',
                        updateTime: '2023-07-21T02:44:51.037Z',
                        __v: 0,
                      },
                      {
                        _id: '64b9f15e64d7e29e5d44a466',
                        menuType: 2,
                        menuName: '新增',
                        menuCode: 'user@create',
                        orderBy: 1,
                        menuState: 1,
                        parentId: '64b9d75464d7e29e5d44a18e',
                        createId: 1000339,
                        createTime: '2023-07-03T07:49:23.392Z',
                        updateTime: '2023-07-03T07:49:23.392Z',
                        __v: 0,
                      },
                    ],
                  },
                ],
              },
            ],
            buttonList: [
              'driver@list',
              'cluster@list',
              'order@list',
              'roleList@list',
              'menuList@list',
              'deptlist@list',
              'user@list',
              'user@create',
              'dashboard@list',
            ],
          },
          msg: '',
        }
      },
    },
    {
      url: '/api/user/list',
      method: 'get',
      response: ({ body, query }: any) => {
        console.log('body>>>>>>>>', body)
        console.log('query>>>>>>>>', query)

        return Mock.mock({
          code: 0,
          data: {
            page: {
              pageNum: 1,
              pageSize: 10,
              total: 28,
            },
            'list|10': [
              {
                'userId|+1': 1000339,
                userName: '@cname',
                userEmail: '@email',
                mobile: '',
                deptId: '',
                deptName: '',
                job: '',
                state: '@integer(1,3)',
                role: '@integer(0,3)',
                roleList: [],
                'createId|+1': 1000002,
                userImg: '',
                createTime: '@datetime',
                lastLoginTime: '@datetime',
                __v: 0,
              },
            ],
          },
          msg: '',
        })
      },
    },
  ]
}
