"use client";

import React from "react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { ACCOUNT_TITLE } from "@/constants";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { UserDetailsCard, UserInfoCard } from "@/app/account/center/components";

const UserCenter: React.FC = () => {
  const loginUser = useSelector((state: RootState) => state.loginUser);

  return (
    <PageContainer title={ACCOUNT_TITLE}>
      <Row align={"top"} gutter={[16, 16]}>
        <Col xs={24} md={8} lg={6} xl={6}>
          <ProCard bordered={false}>
            <UserInfoCard user={loginUser || {}} />
          </ProCard>
        </Col>
        <Col xs={24} md={16} lg={18} xl={18}>
          <ProCard bordered>
            <UserDetailsCard user={loginUser || {}} />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserCenter;
