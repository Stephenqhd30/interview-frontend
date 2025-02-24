import { UserRoleEnum } from "@/enums/UserRoleEnum";

export const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userAvatar: "/assets/notLoginUser.png",
  userRole: UserRoleEnum.USER,
  userProfile: "该用户很懒未设置简介",
};
