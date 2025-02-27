import React from "react";
import { XProvider } from "@ant-design/x";
import type { AppProps } from "next/app";
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#52c41a",
  },
};

const App = ({ Component, pageProps }: AppProps) => (
  <XProvider theme={theme}>
    <Component {...pageProps} />
  </XProvider>
);

export default App;
