import * as React from 'react'

import Article from '../Card/Card'

import IArticle from '../../interface/Article.interface'

type Props = {
  data: IArticle[]
}

export default function ArticleList(props: Props) {
  const { data } = props;
  return (
    <>
      {data.map(( item ) => <Article key={item.id}  item={item} />)}
    </>
  )
}
