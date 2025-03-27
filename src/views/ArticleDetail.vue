<template>
  <div class="p-4">
    <!-- 显示文章标题 -->
    <h2 class="text-xl font-bold mb-4">{{ article?.title }}</h2>

    <!-- 富文本内容 -->
    <div ref="divRef" class="border border-gray-300 rounded-md" style="height: 600px"></div>

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
import { useRoute } from "vue-router";
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import { onMounted, onUnmounted, ref } from "vue";

const divRef = ref<Element | null>(null);
const article = ref<null | { title: string; content: string; imageUrl?: string }>(null);
let aiEditor: AiEditor | null = null;

// 获取路由参数
const route = useRoute();
const articleId = route.params.id;

onMounted(async () => {
  try {
    // 请求文章数据
    const { data } = await axios.get(`http://localhost:8080/api/articles/${articleId}`);
    article.value = data;

    // 初始化富文本编辑器
    /*aiEditor = new AiEditor({
      element: divRef.value as Element,
      placeholder: "",
      content: data.content || "", // 设置编辑器内容
      read: true, // 只读模式
    });*/
  } catch (error) {
    console.error("加载文章失败：", error);
  }
});

// 销毁编辑器实例
onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
    aiEditor = null;
  }
});
</script>