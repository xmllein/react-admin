import request from '@/utils/request'
import { Login, User, Menu, ResultData } from '@/types/api'
export default {
  // 登录
  login(params: Login.params) {
    return request.post('/user/login', params, { showLoading: false })
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/user/getUserInfo')
  },
  // 获取权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>(
      '/user/getPermissionList'
    )
  },
  // 获取用户列表
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/user/list', params)
  },
}
