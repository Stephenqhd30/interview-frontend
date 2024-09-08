"use client";

import { PageContainer, ProCard } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { ACCOUNT_TITLE } from "@/constants";
import { Grid } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import {
  BaseView,
  BindingView,
  SecurityView,
} from "@/app/account/setting/components";

const { useBreakpoint } = Grid;

const Settings: React.FC = () => {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [activeKeyTab, setActiveKeyTab] = useState<string>(() => {
    return localStorage.getItem("activeKeyTab") || "base";
  });

  useEffect(() => {
    localStorage.setItem("activeKeyTab", activeKeyTab);
  }, [activeKeyTab]);

  const screens = useBreakpoint();
  const isMobile = !screens.md; // 576px 以下为移动端

  return (
    <PageContainer title={ACCOUNT_TITLE}>
      <ProCard
        className={"pro-card"}
        tabs={{
          tabPosition: isMobile ? "top" : "left",
          activeKey: activeKeyTab,
          items: [
            {
              label: `基本设置`,
              key: "base",
              children: <BaseView user={loginUser} />,
            },
            {
              label: `账号绑定`,
              key: "binding",
              children: <BindingView />,
            },
            {
              label: `安全设置`,
              key: "security",
              children: <SecurityView />,
            },
          ],
          onChange: (activeKey) => {
            setActiveKeyTab(activeKey);
          },
        }}
      />
    </PageContainer>
  );
};

export default Settings;
