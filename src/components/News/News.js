import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NewsItem from './NewsItem';
import {Line} from "react-chartjs-2";

const News = ({nbdate,sname,snamestate}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    /* console.log("nbdate is: " + nbdate);
    console.log(nbdate);
    console.log(nbdate.nbdate); */
    const newsdate = nbdate.nbdate;
    const getArticles = async () => {
      const res = await Axios.get(
          `https://newsapi.org/v2/everything?qInTitle=Covid+in+${sname}&from=${newsdate}&to=${newsdate}&language=en&sortBy=relevancy&pageSize=10&apiKey=616cce31e0804904bc48ac01f41fe27e`,
      );

      setArticles(res.data.articles);
      console.log(res);
    };

    getArticles();
  }, [nbdate,sname]);

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