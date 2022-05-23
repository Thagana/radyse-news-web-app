import * as React from "react";
import Description from "../Description";
import IArticle from "../../interface/Article.interface";
import Notification from 'antd/es/notification';

import { Store } from '../../helpers/LocalArticleStore';

import "./Card.scss";

interface Props {
  item: IArticle;
  isLocal: boolean;
}

export default function Article(props: Props) {
  const { item, isLocal } = props;
  const handleClick = () => {
    window.open(item.url, "_blank");
  };

  const handleBookMark = async () => {
    try {
      await Store.addArticles(item);
      Notification.success({
        message: 'Successfully added a bookmark item'
      })
    } catch (error) {
      console.log(error);
      Notification.error({
        message: 'Something went wrong please try again',
      })
    }
  };

  return (
    <div className='card-container'>
      <img src={item.urlToImage} alt={item.title} />
      <div className='card-details'>
        <h2 onClick={handleClick}>{item.title}</h2>
        <div>
          <Description
            description={item.description}
            source={item.source}
            publishedAt={item.publishedAt}
            handleBookMark={handleBookMark}
            handleClick={handleClick}
            isLocal={isLocal}
          />
        </div>
      </div>
    </div>
  );
}
