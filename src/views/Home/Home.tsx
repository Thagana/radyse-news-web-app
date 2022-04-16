import * as React from 'react'
import Template from '../Template';
import Notification from 'antd/es/notification'

import './Home.scss';

import Network from '../../services';

import ArticleList from '../../components/CardList/CardList';
import IArticle from '../../interface/Article.interface';

export default function Home() {
  const mounted = React.useRef(true);
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const fetchNews = async () => {
    try {
      const response = await Network.fetchNews() as {
        data: IArticle[]
        success: boolean
      };
      const { data, success } = response;
      console.log('xxxxxxxx', data, success);
      if (success) {
        if (mounted.current) {
          setArticles(data);
        }
      } else {
        Notification.error({
          message: 'Something went wrong please try again later'
        })
      }
    } catch (error) {
      console.log(error);
      Notification.error({
        message: 'Something went wrong please try again later'
      })
    }
  }
  React.useEffect(() => {
    fetchNews();
  },[])

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    }
  },[]);

  return (
    <Template>
      <div className='container'>
        <ArticleList data={articles} />
      </div>
    </Template>
  )
}
