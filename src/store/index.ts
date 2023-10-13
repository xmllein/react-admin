import { User } from '@/types/api'
import { create } from 'zustand'

export const useStore = create<{
  token: string
  userInfo: {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }
  collapsed: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateCollapsed: () => void
}>((set) => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
    userImg: '',
    userId: 0,
    state: 0,
    mobile: '',
    job: '',
    deptName: '',
    _id: '',
    deptId: '',
    role: 0,
    roleList: '',
    createId: 0,
  },
  collapsed: false,
  updateToken: (token: string) => set(() => ({ token })),
  updateUserInfo: (userInfo: User.UserItem) => set(() => ({ userInfo })),
  updateCollapsed: () =>
    set((state) => {
      return {
        collapsed: !state.collapsed,
      }
    }),
}))
