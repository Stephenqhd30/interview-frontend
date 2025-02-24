import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

/**
 * 500服务异常页面
 * @constructor
 */
const ServiceErrorPage = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Link href="/">
        <Button type="primary">返回主页</Button>
      </Link>
    }
  />
);

export default ServiceErrorPage;
