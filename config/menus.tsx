import { MenuDataItem } from "@ant-design/pro-layout";
import {
  BookOutlined,
  CrownOutlined,
  ExceptionOutlined,
  HomeOutlined, QuestionCircleOutlined,
} from '@ant-design/icons';
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
    path: "/banks",
    name: "题库",
    icon: <BookOutlined />,
  },
  {
    path: "/questions",
    name: "题目",
    icon: <QuestionCircleOutlined />,
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
    path: "/user",
    icon: <CrownOutlined />,
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "登录",
      },
      {
        path: "/user/register",
        name: "注册",
      },
    ],
  },
  {
    path: "/account",
    icon: <CrownOutlined />,
    name: "个人页",
    children: [
      {
        path: "/account",
        redirect: "/account/center",
      },
      {
        path: "/account/center",
        name: "个人中心",
      },
      {
        path: "/account/setting",
        name: "个人设置",
      },
    ],
  },
  {
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