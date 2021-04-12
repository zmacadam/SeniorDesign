import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NewsItem from './NewsItem';

const News = (nbDate) => {
  const [articles, setArticles] = useState([]);
  const toDate = nbDate;
  console.log(toDate);

  useEffect(() => {
    const getArticles = async () => {
      const res = await Axios.get(
        `https://newsapi.org/v2/everything?q=Texas+Covid+Government&to=${toDate}&apiKey=616cce31e0804904bc48ac01f41fe27e`,
      );

      setArticles(res.data.articles);
      console.log(res);
    };

    getArticles();
  }, [nbDate]);

  return (
    <div>
      {articles.map(({ title, description, url, urlToImage }) => (
        <NewsItem
          title={title}
          description={description}
          url={url}
          urlToImage={urlToImage}
        />
      ))}
    </div>
  );
};

export default News;
