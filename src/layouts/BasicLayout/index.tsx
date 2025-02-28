import { ProLayout } from "@ant-design/pro-components";
import React from "react";
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
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { menus } from "../../../config/menus";
import { AvatarDropdown } from "@/components/GlobalHeader";

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
  const router = useRouter();

  // 判断是否为登录页面
  const isLoginPage =
    pathname === "/user/login" || pathname === "/user/register";

  // 如果是登录页面，不渲染布局，只渲染 children 内容
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div id="basic-layout">
      <ProLayout
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
            return <AvatarDropdown currentUser={loginUser} />;
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
