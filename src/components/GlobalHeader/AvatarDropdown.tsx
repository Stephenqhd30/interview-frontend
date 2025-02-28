import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Grid, message, Space } from "antd";
import React, { useCallback } from "react";
import { userLogoutUsingPost } from "@/api/userController";
import Link from "antd/lib/typography/Link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { useRouter } from "next/navigation";
import { setLoginUser } from "@/stores/user/loginUser";
import { DEFAULT_USER } from "@/mock/user";
import HeaderDropdown from "@/components/GlobalHeader/HeaderDropdown";

const { useBreakpoint } = Grid;

export type AvatarDropdownProps = {
  menu?: boolean;
  children?: React.ReactNode;
  currentUser: API.LoginUserVO;
};

/**
 * 头像下拉框
 * @constructor
 */
const AvatarDropdown: React.FC<AvatarDropdownProps> = (props) => {
  const { currentUser } = props;
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = !useBreakpoint().md;
  const router = useRouter();
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    try {
      const res: any = await userLogoutUsingPost();
      const { pathname, search } = window.location;
      const urlParams = new URL(window.location.href).searchParams;
      const redirect = urlParams.get("redirect");

      if (res.code === 0 && res.data) {
        if (pathname !== "/user/login" && !redirect) {
          // 使用字符串拼接来替换 URL
          router.replace(`/user/login?redirect=${pathname}${search}`);
        }
      } else {
        message.error(`退出登录失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`退出登录失败: ${error.message}`);
    }
  };

  /**
   * 菜单项点击处理
   */
  const onMenuClick = useCallback(
    (event: { key: string }) => {
      const { key } = event;
      if (key === "logout") {
        dispatch(setLoginUser(DEFAULT_USER)); // 更新登录状态
        loginOut();
        return;
      }
      router.push(`/account/${key}`);
    },
    [dispatch, router],
  );

  // 如果用户未登录，则展示登录按钮
  if (!currentUser) {
    return (
      <Link href={"/user/login"}>
        <Button type="primary">登录</Button>
      </Link>
    );
  }

  const menuItems = [
    {
      key: "center",
      icon: <UserOutlined />,
      label: "个人中心",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "个人设置",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <Space>
        {currentUser?.userAvatar ? (
          <Space>
            <Avatar src={currentUser?.userAvatar} />
            {!isMobile && <span>{currentUser?.userName}</span>}
          </Space>
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </Space>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
