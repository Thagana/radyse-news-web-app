import * as React from "react";
import { format } from "date-fns";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import "./Description.scss";

type Props = {
  description: string;
  source: string;
  publishedAt: string;
  handleBookMark: () => void;
  handleClick: () => void;
  isLocal: boolean;
};

export default function Description(props: Props) {
  const { description, source, publishedAt, handleBookMark, handleClick, isLocal } = props;
  return (
    <div className='description'>
      <div className='description-text' onClick={handleClick}>{description}</div>
      <div className='source-items'>
        Source: <div className='source'>{source}</div> -{" "}
        <div className='date'>
          {format(new Date(publishedAt), 'yyyy/MM/dd')}
        </div>
        <div className="bookmark" onClick={handleBookMark}>
          {isLocal ? <HeartFilled  style={{ color: '#fff', fontSize: '2rem' }} /> : <HeartOutlined style={{ color: '#fff', fontSize: '2rem' }} /> }
          
        </div>
      </div>
    </div>
  );
}
