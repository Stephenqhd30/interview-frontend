import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from '@/layouts/BasicLayout';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <BasicLayout>{children}</BasicLayout>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;