// 默认用户
import ACCESS_ENUM from '@/access/accessEnum';

export const DEFAULT_USER: API.LoginUserVO = {
	userName: "未登录",
	userAvatar: "/assets/notLoginUser.png",
	userRole: ACCESS_ENUM.NOT_LOGIN,
	userProfile: "该用户很懒未设置简介"
}