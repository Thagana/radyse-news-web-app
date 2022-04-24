import * as React from "react";
import Description from "../Description";
import IArticle from "../../interface/Article.interface";

import "./Card.scss";

interface Props {
  item: IArticle;
}

export default function Article(props: Props) {
  const { item } = props;
  const handleClick = () => {
    window.open(item.url, "_blank");
  };

  const handleBookMark = () => {
    console.log('book marked!')
  };

  return (
    <div className='card-container'>
      <img src={item.urlToImage} alt={item.title} />
      <div className='card-details'>
        <h2 onClick={handleClick}>{item.title}</h2>
        <p>
          <Description
            description={item.description}
            source={item.source}
            publishedAt={item.publishedAt}
            handleBookMark={handleBookMark}
            handleClick={handleClick}
          />
        </p>
      </div>
    </div>
  );
}
