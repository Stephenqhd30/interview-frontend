import { CSSProperties } from "react";
import { theme } from "antd";

const Style = () => {
  const { token } = theme.useToken();

  const containerStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "auto",
    backgroundImage:
      "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
    backgroundSize: "100% 100%",
  };

  return {
    containerStyles,
  };
};
export default Style;
