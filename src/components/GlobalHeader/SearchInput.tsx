import React from "react";
import { Input, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/**
 * 搜索框
 * @constructor
 */
const SearchInput: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden="true"
      className={"search-input"}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        className={"input"}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

export default SearchInput;
