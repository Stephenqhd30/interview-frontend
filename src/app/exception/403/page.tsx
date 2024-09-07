import { Button, Result } from "antd";
import Link from "next/link";

const ForbiddenPage = () => (
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
export default ForbiddenPage;
