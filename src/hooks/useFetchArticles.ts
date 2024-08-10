import * as React from "react";
import IArticle from "../interface/Article.interface";

import Network from "../services/index";
import UniqueNameSet from "../utils/UniqueNameSet";

function useFetch(page: number) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const [hasMore, setHasMore] = React.useState(true);

  const sendQuery = React.useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(false);
      const response = await Network.fetchNews(page)
      if (response.success) {
        setArticles((prev) => Array.from(new UniqueNameSet([...prev, ...response.data]).values()));
        setHasMore(response.data.length > 0);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, []);

  React.useEffect(() => {
    sendQuery(page);
  }, [sendQuery, page]);
  return { loading, error, articles, hasMore };
}

export default useFetch;
