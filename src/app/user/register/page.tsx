"use client";

import { LoginFormPage } from "@ant-design/pro-components";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { BACKGROUND_IMAGE, STEPHEN_SUBTITLE, STEPHEN_TITLE } from "@/constants";
import { userRegisterUsingPost } from "@/api/userController";
import Image from "next/image";
import { RegisterPage } from "@/app/user/register/components";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import Style from '@/app/user/register/style';

const Login: React.FC = () => {
  const [redirected, setRedirected] = useState(false); // 控制重定向状态

  // 用户注册
  const handleRegisterSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      await userRegisterUsingPost({
        ...values,
      });
      const defaultLoginSuccessMessage = "注册成功！";
      message.success(defaultLoginSuccessMessage);
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `注册失败${error.message}, 请重试！`;
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  // useEffect 监听 redirected 状态的变化
  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      // history.push(urlParams.get("redirect") || "/user/login");
    }
  }, [redirected]);

  return (
    <div id={"register"} style={Style().containerStyles}>
      <div
        style={{
          flex: "1 auto",
          padding: "0",
        }}
      >
        {/*用户登录的表单*/}
        <LoginFormPage
          submitter={{
            searchConfig: {
              submitText: "注册",
            },
          }}
          backgroundImageUrl={BACKGROUND_IMAGE}
          containerStyle={{
            backdropFilter: "blur(4px)",
          }}
          logo={<Image alt="logo" height={44} width={44} src="/assets/logo.png" />}
          title={STEPHEN_TITLE}
          subTitle={STEPHEN_SUBTITLE}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleRegisterSubmit(values as API.UserRegisterRequest);
            setRedirected(true);
          }}
        >
          <RegisterPage />
        </LoginFormPage>
      </div>
      <GlobalFooter />
    </div>
  );
};
export default Login;
