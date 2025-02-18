"use client";

import { LoginFormPage } from "@ant-design/pro-components";

import { Divider, message, Space, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  AlipayOutlined,
  TaobaoOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { BACKGROUND_IMAGE, STEPHEN_SUBTITLE, STEPHEN_TITLE } from "@/constants";
import { userLoginUsingPost } from "@/api/userController";
import Image from "next/image";
import GlobalFooter from "@/components/GlobalFooter";
import { AccountLoginPage, PhoneLoginPage } from "@/app/user/login/components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import "./index.css";
import { setLoginUser } from "@/stores/user/loginUser";
import Style from "@/app/user/login/style";
import { useRouter } from "next/navigation";

/**
 * 用户登录页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const [type, setType] = useState<string>("account");
  const dispatch = useDispatch<AppDispatch>();
  const [redirected, setRedirected] = useState(false); // 控制重定向状态
  const router = useRouter();
  const items = [
    { label: "账户密码登录", key: "account" },
    { label: "手机号登录", key: "mobile" },
  ];
  // 用户登录
  const handleLoginSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      if (res.data) {
        // 保存已登录的用户信息
        dispatch(setLoginUser(res?.data as API.LoginUserVO));
        setRedirected(true); // 设置重定向状态为 true
      }
      message.success("登录成功！");
    } catch (error: any) {
      message.error(`登录失败${error.message}, 请重试！`);
    }
  };

  // useEffect 监听 redirected 状态的变化
  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      router.push(urlParams.get("redirect") || "/");
    }
  }, [redirected]);

  return (
    <div id={"login"} style={Style().containerStyles}>
      <title>{STEPHEN_TITLE}</title>
      <div
        style={{
          flex: "1 auto",
          padding: "16",
        }}
      >
        {/*用户登录的表单*/}
        <LoginFormPage
          backgroundImageUrl={BACKGROUND_IMAGE}
          containerStyle={{
            backdropFilter: "blur(4px)",
          }}
          logo={
            <Image alt="logo" width={44} height={44} src="/assets/logo.png" />
          }
          title={STEPHEN_TITLE}
          subTitle={STEPHEN_SUBTITLE}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleLoginSubmit(values as API.UserLoginRequest);
          }}
          actions={
            <div className="login-form-actions">
              <Divider plain>
                <span style={Style().dividerStyle}>其他登录方式</span>
              </Divider>
              <Space align="center" size={24}>
                <div style={Style().iconStyles}>
                  <AlipayOutlined className={"icon-styles-alipay"} />
                </div>
                <div style={Style().iconStyles}>
                  <TaobaoOutlined className={"icon-styles-taobao"} />
                </div>
                <div style={Style().iconStyles}>
                  <WeiboOutlined className={"icon-styles-weibo"} />
                </div>
                <Typography.Link href={"/user/register"}>
                  去注册
                </Typography.Link>
              </Space>
            </div>
          }
        >
          {/*用户选择账号密码登录*/}
          <Tabs centered activeKey={type} onChange={setType} items={items} />
          {/*用户选择账号密码登录*/}
          {type === "account" && <AccountLoginPage />}
          {type === "mobile" && <PhoneLoginPage />}
        </LoginFormPage>
      </div>
      <GlobalFooter />
    </div>
  );
};
export default UserLoginPage;
