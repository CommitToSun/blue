<template>
  <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">文章列表</h2>
    <ul>
      <li
          v-for="article in articles"
          :key="article.id"
          class="p-4 mb-4 bg-white rounded-lg shadow-sm border border-gray-300 hover:shadow-md hover:bg-gray-50 transition-all"
      >
        <router-link :to="'/articles/' + article.id" class="no-underline">
          <h3 class="text-lg font-bold text-blue-500 hover:text-blue-700">
            {{ article.title }}
          </h3>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/articles/list");
      this.articles = response.data;
    } catch (error) {
      console.error("获取文章列表失败:", error);
    }
  },
  mounted() {
    // 滚动条滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

/* 鼠标悬停样式 */
li:hover {
  transform: scale(1.01);
  transition: all 0.2s ease-in-out;
}
</style>