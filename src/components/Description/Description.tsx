import * as React from "react";
import { formatDistance } from "date-fns";
import { BookOutlined } from '@ant-design/icons';
import "./Description.scss";

type Props = {
  description: string;
  source: string;
  publishedAt: string;
  handleBookMark: () => void;
  handleClick: () => void;
};

export default function Description(props: Props) {
  const { description, source, publishedAt, handleBookMark, handleClick } = props;
  return (
    <div className='description'>
      <div className='description-text' onClick={handleClick}>{description}</div>
      <div className='source-items'>
        Source: <div className='source'>{source}</div> -{" "}
        <div className='date'>
          {formatDistance(new Date(publishedAt), new Date(), {
            addSuffix: true,
          })}
        </div>
        <div className="bookmark" onClick={handleBookMark}>
          <BookOutlined color="#fff"/>
        </div>
      </div>
    </div>
  );
}
