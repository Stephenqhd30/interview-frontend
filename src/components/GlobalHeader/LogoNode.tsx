import React from "react";
import { Image } from "antd";
import "./index.css";

/**
 *
 * @constructor
 */
const LogoNode: React.FC = () => {
  return (
    <div className="logoNode">
      <Image
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
        draggable={false}
        alt="logo"
        preview={false}
      />
      <span>Ant Design X</span>
    </div>
  );
};

export default LogoNode;
