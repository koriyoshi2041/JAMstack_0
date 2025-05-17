const axios = require("axios");

// 重试函数
async function fetchWithRetry(url, retries = 3, timeout = 10000) {
  try {
    return await axios.get(url, { timeout });
  } catch (error) {
    if (retries <= 1) throw error;
    console.log(`请求失败，剩余重试次数: ${retries - 1}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒再重试
    return fetchWithRetry(url, retries - 1, timeout);
  }
}

module.exports = async function() {
  try {
    // 1. 获取前500个热门故事的ID
    const topStoriesResponse = await fetchWithRetry(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const topStoryIds = topStoriesResponse.data.slice(0, 5); // 只取前5个故事
    
    // 2. 获取每个故事的详细信息
    const stories = await Promise.all(
      topStoryIds.map(async (id) => {
        try {
          const storyResponse = await fetchWithRetry(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return storyResponse.data;
        } catch (error) {
          console.error(`获取ID为${id}的故事时出错:`, error.message);
          // 返回一个填充数据作为fallback
          return {
            id,
            title: "无法加载的文章",
            url: "#",
            by: "unknown",
            score: 0,
            time: Date.now() / 1000
          };
        }
      })
    );
    
    return stories;
  } catch (error) {
    console.error("获取HackerNews数据时出错:", error.message);
    // 返回示例数据作为fallback
    return [
      {
        id: 1,
        title: "暂时无法连接到HackerNews API",
        url: "https://news.ycombinator.com/",
        by: "system",
        score: 999,
        time: Date.now() / 1000
      }
    ];
  }
}; 