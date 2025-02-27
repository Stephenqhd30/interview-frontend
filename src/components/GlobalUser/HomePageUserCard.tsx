import React from "react";
import { StatisticCard } from "@ant-design/pro-card";
import { Image, Typography } from "antd";

const user = {
  userName: "StephenQiu",
  description: "StephenQiu",
  userAvatar:
    "http://121.36.17.18:9000/trajectory/user_avatar/1782755477639864321/fdb36cdf568745efa7c73d68145be72a.jpg",
};

/**
 * 主页显示的用户卡片
 * @constructor
 */
const HomePageUserCard: React.FC = () => {
  return (
    <StatisticCard.Group direction={"column"} bodyStyle={{ padding: 0 }}>
      <StatisticCard
        layout={"center"}
        chart={<Image preview={false} src={user?.userAvatar} />}
        chartPlacement={"left"}
      />
      <StatisticCard
        bodyStyle={{ padding: 0 }}
        headStyle={{ padding: 0 }}
        title={
          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: 700,
            }}
            ellipsis={{
              tooltip: user?.userName,
              symbol: "...",
            }}
          >
            {user?.userName}
          </Typography.Text>
        }
      />
    </StatisticCard.Group>
  );
};

export default HomePageUserCard;
