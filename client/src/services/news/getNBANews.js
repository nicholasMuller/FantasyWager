import axios from "axios";

export const getNBANews = async () => {
  const newsStories = [];
  const response = await axios.get(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
  );
  for (const story in response.data["articles"]) {
    newsStories.push(response.data.articles[story]);
  }
  // console.log(newsStories.data)
  return newsStories;
};
