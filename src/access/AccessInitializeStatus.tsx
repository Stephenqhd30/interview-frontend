import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { usePathname } from "next/navigation";
import { findAllMenusItemByPath } from "../../config/menus";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import ForbiddenPage from "@/app/exception/403/page";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructorpnp
 */
const AccessInitializeStatus: React.FC<
  Readonly<{ children: React.ReactNode }>
> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // 获取路径
  const pathname = usePathname();
  // 获取当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 根据当前路径获取需要的权限
  const menu = findAllMenusItemByPath(pathname);
  // 当前菜单需要的权限并设置默认值未不需要任何权限
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <ForbiddenPage />;
  }
  return children;
};

export default AccessInitializeStatus;
