import axios from "axios";

export const getNFLNews = async () => {
    const newsStories = []
    const response = await axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/news")
    for(const story in response.data["articles"]){
        newsStories.push(response.data.articles[story])
    }
    // console.log(newsStories.data)
    return newsStories
};

export default getNFLNews