import * as React from "react";
import { formatDistance } from "date-fns";
import "./Description.scss";

type Props = {
  description: string;
  source: string;
  publishedAt: string;
};

export default function Description(props: Props) {
  const { description, source, publishedAt } = props;
  return (
    <div className='description'>
      <div className='description-text'>{description}</div>
      <div className='source-items'>
        Source: <div className='source'>{source}</div> -{" "}
        <div className='date'>
          {formatDistance(new Date(publishedAt), new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
}
