import { Menu } from '@/types/api'
// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(
      Array.isArray(item.children) && !item.buttons
        ? getMenuPath(item.children)
        : item.path + ''
    )
  }, [])
}

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      return searchRoute(path, item.children)
    }
  }
  return ''
}
