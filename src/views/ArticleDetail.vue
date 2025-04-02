<template>
  <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
    <!-- 文章标题 -->
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8 border-b-2 border-gray-300 pb-4">
      {{ article?.title }}
    </h1>

    <!-- 元信息，如作者、发布日期等 -->
    <div class="flex justify-between items-center mb-6">
      <p v-if="article?.date" class="text-sm text-gray-500 italic">
        发布日期：{{ formatDate(article.date) }}
      </p>
      <button
          class="text-blue-500 font-medium hover:text-blue-700"
          @click="goBack"
      >
        返回
      </button>
    </div>

    <!-- 文章内容部分 -->
    <div
        class="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8"
        v-html="article?.content"
        style="text-indent: 2em; line-height: 2; word-wrap: break-word;"
    ></div>

    <!-- 文章封面部分 -->
    <div v-if="article?.imageUrl" class="relative mt-8">
      <p class="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white text-xs font-bold rounded px-2 py-1 shadow">
        封面图片
      </p>
      <img
          :src="article.imageUrl"
          alt="文章封面"
          class="w-full rounded-md shadow-lg border border-gray-300"
      />
    </div>

    <!-- 版权或备注信息 -->
    <p class="text-center text-xs text-gray-400 mt-6">
      本文内容归作者所有，转载请注明来源。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// 状态和路由参数
const article = ref<null | { title: string; content: string; imageUrl?: string; date?: string }>(null);
const route = useRoute();
const articleId = route.params.id;
const router = useRouter();

// 返回上一页
const goBack = () => {
  router.back();
};

// 页面加载时获取文章详情
onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/articles/${articleId}`);
    article.value = data;

    // 页面加载回顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("加载文章失败：", error);
  }
});

// 格式化日期的辅助函数
const formatDate = (date: string): string => {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  return new Date(date).toLocaleDateString("zh-CN", options);
};
</script>

<style scoped>
.container {
  max-width: 960px;
}

/* 图片 hover 的变换特效 */
img {
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

img:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>