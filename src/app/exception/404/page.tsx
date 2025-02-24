import { Button, Result } from "antd";
import React from "react";
import Link from "next/link";

/**
 * 404无法访问页面
 * @constructor
 */
const NotFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={"抱歉，您访问的页面不存在。"}
    extra={
      <Link href="/">
        <Button type="primary">返回主页</Button>
      </Link>
    }
  />
);
export default NotFoundPage;
