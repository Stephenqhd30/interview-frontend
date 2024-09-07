"use client";

import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import {getLoginUserUsingGet} from '@/api/userController';
import {Provider, useDispatch} from 'react-redux';
import {setLoginUser} from '@/stores/loginUser';
import LoginUserVO = API.LoginUserVO;
import {DEFAULT_USER} from '@/mock/user';
import store, {AppDispatch} from '@/stores';

/**
 * 全局初始化逻辑
 * @param children
 * @constructorpnp
 */
const InitializeStatus: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 全局初始化，有单词调用的代码，都可以写到这里
   */
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      dispatch(setLoginUser(res.data as LoginUserVO));
    }else {
      dispatch(setLoginUser(DEFAULT_USER));
    }
  }, []);

  // 只执行一次
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
              <BasicLayout>{children}</BasicLayout>
            </InitializeStatus>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;