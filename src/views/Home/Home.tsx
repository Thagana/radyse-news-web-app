import * as React from "react";
import Template from "../Template";

import "./Home.scss";

import ArticleList from "../../components/CardList/CardList";

import useFetch from "../../hooks/useFetchArticles";

export default function Home() {
  const [page, setPage] = React.useState(1);
  const { loading, error, articles, hasMore } = useFetch(page);

  const mounted = React.useRef(true);
  const loader = React.useRef(null);

  const handleObserver = React.useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore]
  );

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Template activeKey='1'>
      <div className='container'>
        <ArticleList data={articles} isLocal={false} />
        {loading && !error && <div className='loading'>LOADING ...</div>}
        {error && !loading && (
          <div className='d-flex justify-content-center'> ERROR </div>
        )}
        <div ref={loader} />
      </div>
    </Template>
  );
}
