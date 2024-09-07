"use client";

import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import AccessInitializeStatus from "@/access/AccessInitializeStatus";

/**
 * 全局初始化逻辑
 * @param children
 * @constructorpnp
 */
const InitializeStatus: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 全局初始数，有单词调用的代码，都可以写到这里
   */
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data as API.LoginUserVO));
    } else {
      setTimeout(() => {
        const testUser: API.LoginUserVO = {
          id: 1,
          userName: "测试用户",
          userAvatar: "https://code-nav.cn/logo.png",
          userRole: "admin",
        };
        dispatch(setLoginUser(testUser));
      }, 3000);
    }
  }, []);

  //'测试用户'
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitializeStatus>
              <BasicLayout>
                <AccessInitializeStatus>{children}</AccessInitializeStatus>
              </BasicLayout>
            </InitializeStatus>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;