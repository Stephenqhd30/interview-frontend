import { MenuDataItem } from "@ant-design/pro-layout";
import {
  BankOutlined,
  CrownOutlined,
  HomeOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

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
    children: [
      {
        path: "/admin/userList",
        name: "用户管理",
      },
    ],
  },
] as MenuDataItem[];
