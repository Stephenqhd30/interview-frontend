import React from "react";
import { DefaultFooter } from "@ant-design/pro-layout";
import { GitlabOutlined } from "@ant-design/icons";
import {
  GITHUB,
  GITLAB,
  STEPHEN_AUTHOR,
  STEPHEN_BLOG,
  STEPHEN_DEFAULT_MESSAGE
} from '@/constants';

import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
const GlobalFooter: React.FC = () => {
  const defaultMessage = STEPHEN_DEFAULT_MESSAGE;
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      className={"global-footer"}
      copyright={`${defaultMessage} ${currentYear}`}
      links={[
        {
          key: "Blog",
          title: STEPHEN_AUTHOR,
          href: STEPHEN_BLOG,
          blankTarget: true,
        },
        {
          key: "Gitlab",
          title: <GitlabOutlined /> ,
          href: GITLAB,
          blankTarget: true,
        },
        {
          key: "GITHUB",
          title: STEPHEN_DEFAULT_MESSAGE,
          href: GITHUB,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
