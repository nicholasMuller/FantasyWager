import { useEffect, useState } from "react";
import { getNBANews } from "../../services/news/getNBANews";
import NewsCard from "../../components/betting/news/NewsCard";

const NBANewsPage = () => {
  const [newsStories, setNewsStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const stories = await getNBANews();
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

export default NBANewsPage;
