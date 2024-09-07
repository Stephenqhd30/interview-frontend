import { MenuDataItem } from "@ant-design/pro-layout";
import { menus } from "../../config/menus";
import checkAccess from "@/access/checkAccess";

/**
 * 获取可访问的菜单
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (
  loginUser: API.LoginUserVO,
  menuItems: MenuDataItem[] = menus,
) => {
  return menuItems.filter((item) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenus;
