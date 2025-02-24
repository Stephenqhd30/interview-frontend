"use client";

import React from "react";
import { Col, Row } from "antd";
import UserAvatarCard from "@/components/GlobalUser/UserAvatarCard";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import {PageContainer, ProCard} from '@ant-design/pro-components';

const HomePage: React.FC = () => {
  const loginUser = useSelector((state: RootState) => state.loginUser);

  return (
    <PageContainer title={false} breadcrumb={undefined}>
      <Row>
        <Col span={12}>
          <ProCard>
            Grtsinry43’s Blog Nothing but enthusiasm brightens up the endless
            years. 总之岁月漫长，然而值得等待
          </ProCard>
        </Col>
        <Col span={12}>
          <ProCard>
            <UserAvatarCard user={loginUser} />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default HomePage;
