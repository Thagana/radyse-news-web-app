import * as  React from 'react'

import Template from '../Template';
import { Store } from '../../helpers/LocalArticleStore';

import './Save.scss';

import Article from '../../interface/Article.interface';
import ArticleList from '../../components/CardList';

export default function Save() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  
  const fetchLocalStore = async () => {
    try {
      const store = await Store.getArticles();
      setArticles(store);
    } catch (error) {
      console.log(error);
    }
  }
  
  React.useEffect(() => {
    fetchLocalStore();
  },[]);

  return (
    <Template activeKey="2">
      <div className='save-container'>
        <ArticleList data={articles} isLocal={true} />
      </div>
    </Template>
  )
}
