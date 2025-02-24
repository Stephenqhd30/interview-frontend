import { Button, Result } from "antd";
import Link from "next/link";

/**
 * 403无权限页面
 * @constructor
 */
const NoAuthPage = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link href="/">
        <Button type="primary">返回主页</Button>
      </Link>
    }
  />
);
export default NoAuthPage;
