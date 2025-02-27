import { CSSProperties } from "react";
import { theme } from "antd";

const Style = () => {
  const { token } = theme.useToken();
  const actionStyles: CSSProperties = {
    marginLeft: "8px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
    transition: "color 0.3s",
    // @ts-ignore
    "&:hover": {
      color: token.colorPrimaryActive,
    },
  };

  const containerStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "auto",
    backgroundImage:
      "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
    backgroundSize: "100% 100%",
  };

  const iconStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 40,
    width: 40,
    border: "1px solid " + token.colorPrimaryBorder,
    borderRadius: "50%",
  };

  const dividerStyle: CSSProperties = {
    color: token.colorTextPlaceholder,
    fontWeight: "normal",
    fontSize: 14,
  };

  return {
    actionStyles,
    containerStyles,
    iconStyles,
    dividerStyle,
  };
};
export default Style;
