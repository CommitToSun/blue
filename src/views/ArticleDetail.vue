<template>
  <div class="p-4">
    <!-- 显示文章标题 -->
    <h2 class="text-xl font-bold mb-4">{{ article?.title }}</h2>

    <!-- 显示文章内容（使用 v-html 动态渲染富文本内容） -->
    <div
        class="border border-gray-300 rounded-md p-4"
        v-html="article?.content"
    ></div>

    <!-- 显示文章封面（如果有） -->
    <img
        v-if="article?.imageUrl"
        :src="'http://localhost:8080' + article.imageUrl"
        alt="封面图片"
        class="w-full mt-4 rounded-md"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// 状态和路由参数
const article = ref<null | { title: string; content: string; imageUrl?: string }>(null);
const route = useRoute();
const articleId = route.params.id;

// 页面加载时获取文章详情
onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/articles/${articleId}`);
    article.value = data; // 将返回的数据保存到状态中
  } catch (error) {
    console.error("加载文章失败：", error);
  }
});
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>