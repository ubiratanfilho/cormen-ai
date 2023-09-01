import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const NoticiasContainer = styled.div`
  background-image: #fff;
  color: #fff;
  text-align: center;
  padding: 85px 0;
  height: 100px;
  width: 100%;
`;

function UltimosLancamentos() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch all articles from your microservice
    axios.get('http://localhost:4000/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return (
    <NoticiasContainer>
      <h1>Notícias</h1>
      <div>
        {articles.map((article) => (
          <div>
            <h3>{article.title}</h3>
            <img src={article.thumbnail} alt={article.title} width={400} height={300} />
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </NoticiasContainer>
  );
};

// function UltimosLancamentos() {
//   return (
//     <NoticiasContainer>
//       <h1>Notícias</h1>
//       {noticias.map((noticia) => (
//         <div>
//           <h3>{noticia.title}</h3>
//           <img src={noticia.thumbnail} alt={noticia.title} width={400} height={300} />
//           <p>{noticia.content}</p>
//         </div>
//       ))}
//     </NoticiasContainer>
//   );
// }

export default UltimosLancamentos;
