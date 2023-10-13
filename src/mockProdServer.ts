import { createProdMockServer } from 'vite-plugin-mock/client'

import loginMockFn from '../mock/login'
import userMockFn from '../mock/user'

export async function setupProdMockServer() {
  const mockModules = [...loginMockFn(), ...userMockFn()]
  await createProdMockServer(mockModules)
}
