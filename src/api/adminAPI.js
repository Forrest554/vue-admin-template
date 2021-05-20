import {
    post,fetch
} from '../utils/my-axios.js'


export const _getAllUser = () => {
    return fetch('/api/admin/user/all')
}
// 用户登录
export const _userLogin = (data) => {
    return post('/api/login', data)
}
// export const _userReg = (data) => {
//     return post('/api/register', data)
// }