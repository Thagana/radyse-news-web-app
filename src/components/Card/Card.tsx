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

  const [thumb, setThumb] = React.useState("https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4");


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

  const handleShare = async () => {
    try {
      if (!item.url || !item.title) {
        Notification.info({
          message: 'Share content cannot be empty',
        })
        return;
      }
      Notification.success({
        message: 'Added to clipboard'
      })
    } catch (error) {
      console.log(error);
      Notification.error({
        message: 'Something went wrong while trying to share',
      })
    }
  };

  const fetchThumb = React.useCallback(async () => {
    try {
      const response = await fetch(
        `https://s2.googleusercontent.com/s2/favicons?domain=${item.url}`
      );
      const imageBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setThumb(base64data as string);
      };
    } catch (error) {
      console.error(error);
    }
  }, [item.url]);


  React.useEffect(() => {
    fetchThumb();
  }, [fetchThumb]);


  return (
    <div className='card-container'>
      <div className="card-top-log">
          <img src={thumb} alt={item.title} className="news-log"/>
      </div>
      <div className="content">
        <div className='card-details'>
          <h2 onClick={handleClick} className="title">{item.title}</h2>
          <div>
            <Description
              description={item.description}
              source={item.source}
              publishedAt={item.publishedAt}
              handleBookMark={handleBookMark}
              handleClick={handleClick}
              handleView={handleClick}
              handleShare={handleShare}
              isLocal={isLocal}
            />
          </div>
        </div>
        <div className="image-container">
          <img src={item.urlToImage} alt={item.title} />
        </div>
      </div>
    </div>
  );
}
