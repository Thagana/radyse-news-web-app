import { Divider, Form, Radio, Skeleton, Space, Switch } from "antd";

import "./ArticleListLoading.scss";

type Props = {
  itemCount: number;
};

export default function ArticleListLoading(props: Props) {
  const { itemCount } = props;
  return (
    <>
      {Array.from(new Array(itemCount)).map((_, index) => (
        <div className="card-container">
          <Skeleton
            avatar
            paragraph={{ rows: 4 }}
            style={{ padding: "1rem" }}
          />
          <Skeleton.Avatar
            className="image"
            size="large"
            shape="square"
            style={{
              width: 150,
              height: 150,
              borderRadius: "2rem",
              padding: "5rem",
              margin: '1rem'
            }}
          />
        </div>
      ))}
    </>
  );
}
