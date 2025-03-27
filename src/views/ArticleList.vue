<template>
  <div class="article-list">
    <h2>文章列表</h2>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="'/articles/' + article.id">
          <h3>{{ article.title }}</h3>
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
      articles: []
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:8080/api/articles/list");
      this.articles = response.data;
    } catch (error) {
      console.error("获取文章列表失败:", error);
    }
  }
};
</script>

<style scoped>
.article-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
img {
  max-width: 100%;
  margin-top: 10px;
}
</style>
