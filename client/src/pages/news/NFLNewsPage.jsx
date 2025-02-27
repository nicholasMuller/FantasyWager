import { useEffect, useState } from "react";
import { getNFLNews } from "../../services/news/getNFLNews";
import NewsCard from "../../components/betting/news/NewsCard";

const NFLNewsPage = () => {
  const [newsStories, setNewsStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const stories = await getNFLNews();
        setNewsStories(stories);
      } catch (err) {
        setError("Failed to fetch news");
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return <NewsCard stories={newsStories} />;
};

export default NFLNewsPage;
