import fetch from './fetch'
// 登录相关
export const login = (userInfo) => fetch('/manage/login', userInfo, 'POST')
export const logout = () => fetch('/manage/loginOut')
// 注册
export const register = (userInfo) => fetch('/manage/register', userInfo, 'POST')
// 获取个人信息
export const getUserInfo = () => fetch('/manage/user')
// 获取动漫列表
export const getCartoonList = (search) => fetch('/manage/cartoon' + search)
// 动漫详情
export const getCartoonInfo = (id) => fetch('/manage/cartoon/' + id)
// 获取轮播图
export const getBannerList = () => fetch('/manage/banner')
// 获取金币消耗记录
export const getIntegralList = (search) => fetch('/manage/user/setIntegral' + search)
// 获取充值记录
export const getOrderList = (search) => fetch('/manage/order' + search)
// 积分消耗
export const setIntegral = (id) => fetch('/manage/user/setIntegral/' + id)



