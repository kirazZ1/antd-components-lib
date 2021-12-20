import { get, post } from '@/utils/request/http'

export const login = (data:any) => post('/api/login',data)