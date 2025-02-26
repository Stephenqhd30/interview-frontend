import { ProLayout } from "@ant-design/pro-components";
import React from "react";
import { Dropdown, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import {
  LOGO,
  STEPHEN_AUTHOR,
  STEPHEN_SUBTITLE,
  STEPHEN_TITLE,
} from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { menus } from "../../../config/menus";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/user/loginUser";
import { DEFAULT_USER } from "@/mock/user";

interface Props {
  children: React.ReactNode;
}

/**
 * 通用布局
 * @param props
 * @constructor
 */
const BasicLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * 用户退出登录
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      dispatch(setLoginUser(DEFAULT_USER));
      router.replace("/");
      message.success("退出登录成功");
    } catch (error: any) {
      message.error("操作失败" + error.message);
    }
  };
  return (
    <div id="basic-layout">
      <ProLayout
        id={"basic-layout"}
        layout={"top"}
        contentWidth={"Fluid"}
        title={STEPHEN_TITLE}
        logo={
          <Image src={LOGO} height={32} width={32} alt={STEPHEN_SUBTITLE} />
        }
        location={{
          // @ts-ignore
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || LOGO,
          size: "small",
          title: loginUser.userName || STEPHEN_AUTHOR,
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div onClick={() => router.push("/user/login")}>{dom}</div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      await userLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        headerTitleRender={(logo, title) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFooter key={"globalFooter"} />;
        }}
        // 定义菜单
        menuDataRender={() => {
          return menus;
        }}
        // 菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={"_self"}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
