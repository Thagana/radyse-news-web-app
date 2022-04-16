import * as React from "react";
import Card from "antd/es/card";
import Description from "../Description";
import IArticle from "../../interface/Article.interface";

const { Meta } = Card;

interface Props {
  item: IArticle;
}

export default function Article(props: Props) {
  const { item } = props;
  const handleClick = () => {
    window.open(item.url, "_blank")
  }
  return (
    <Card
      hoverable
      style={{ width: '28rem', margin: '0.5rem' }}
      cover={<img alt='example' src={item.urlToImage} 
      onClick={handleClick}
      />
    }
    >
      <Meta title={item.title} description={<Description description={item.description}  source={item.source} publishedAt={item.publishedAt} />} />
    </Card>
  );
}
