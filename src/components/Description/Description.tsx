import * as React from "react";
import { formatDistance } from "date-fns";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { MoreOutlined, BookOutlined, ShareAltOutlined, LinkOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

import "./Description.scss";

type Props = {
  description: string;
  source: string;
  publishedAt: string;
  handleBookMark: () => void;
  handleClick: () => void;
  handleShare: () => void;
  handleView: () => void;
  isLocal: boolean;
};

export default function Description(props: Props) {
  const {
    description,
    source,
    publishedAt,
    handleBookMark,
    handleClick,
    handleShare,
    handleView,
    isLocal,
  } = props;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <BookOutlined />
          <div style={{ margin: '0rem 1rem' }}>
            Save for later
          </div>
        </div>
      ),
      onClick: handleBookMark,
    },
    {
      key: "2",
      label: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <ShareAltOutlined />
          <div style={{ margin: '0rem 1rem' }}>
            Share
          </div>
        </div>
      ),
      onClick: handleShare,
    },
    {
      key: "2",
      label: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <LinkOutlined />
          <div style={{ margin: '0rem 1rem' }}>
            Go to page
          </div>
        </div>
      ),
      onClick: handleView,
    },
  ];

  return (
    <div className="description">
      <div className="description-text" onClick={handleClick}>
        {description}
      </div>
      <div className="source-items">
        <div className="description-footer">
          <div className="date">
            {formatDistance(new Date(publishedAt), new Date(), {
              addSuffix: true,
            })}
          </div>{" "}
          - <div className="source">{source}</div>
          <div className="bookmark" onClick={handleBookMark}>
            {isLocal ? (
              <HeartFilled style={{ color: "#fff", fontSize: "2rem" }} />
            ) : (
              <HeartOutlined style={{ color: "#fff", fontSize: "2rem" }} />
            )}
          </div>
        </div>
        <div className="menu-container">
          <Dropdown menu={{ items }} placement="bottom">
              <MoreOutlined
                color="black"
                style={{ fontSize: "1rem", fontWeight: "bold" }}
              />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
