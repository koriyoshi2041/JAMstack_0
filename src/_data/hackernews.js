const axios = require("axios");

module.exports = async function() {
  try {
    // 1. 获取前500个热门故事的ID
    const topStoriesResponse = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
    const topStoryIds = topStoriesResponse.data.slice(0, 5); // 只取前5个故事
    
    // 2. 获取每个故事的详细信息
    const stories = await Promise.all(
      topStoryIds.map(async (id) => {
        const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyResponse.data;
      })
    );
    
    return stories;
  } catch (error) {
    console.error("获取HackerNews数据时出错:", error);
    // 返回空数组作为fallback
    return [];
  }
}; 