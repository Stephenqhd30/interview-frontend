import { MenuDataItem } from "@ant-design/pro-layout";
import {
  BankOutlined,
  CrownOutlined,
  ExceptionOutlined,
  HomeOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 菜单列表
 */
export const menus = [
  {
    path: "/",
    name: "首页",
    icon: <HomeOutlined />,
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin",
        redirect: "/admin/user",
      },
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      },
    ],
  },

  {
    name: "exception",
    path: "/exception",
    icon: <ExceptionOutlined />,
    children: [
      {
        path: "/exception",
        redirect: "/exception/403",
      },
      {
        name: "403",
        path: "/exception/403",
      },
      {
        name: "404",
        path: "/exception/404",
      },
      {
        name: "500",
        path: "/exception/500",
        component: "./exception/500",
      },
    ],
  },
  { path: "*", component: "./exception/404" },
] as MenuDataItem[];

/**
 * 根据全部路径查找菜单
 * @param path
 */
export const findAllMenusItemByPath = (path: string): MenuDataItem | null => {
  return findMenusItemByPath(menus, path);
};

/**
 * 根据路径查找菜单
 * @param menus
 * @param path
 */
export const findMenusItemByPath = (
  menus: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenusItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};