<template>
  <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      {{ isEditing ? "编辑文章" : "上传文章" }}
    </h2>

    <!-- 文章标题输入框 -->
    <label class="block text-sm font-medium text-gray-600 mb-2">
      文章标题
    </label>
    <input
        v-model="article.title"
        placeholder="请输入文章标题"
        class="w-full p-4 text-lg text-black border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
    />

    <!-- 文章内容编辑器 -->
    <label class="block text-sm font-medium text-gray-600 mb-2">
      文章内容
    </label>
    <div
        ref="editorContainer"
        class="border border-gray-300 rounded-md bg-white shadow-sm text-left"
        style="height: 400px; text-align: left; overflow-y: auto; padding: 1rem;"
    ></div>

    <!-- 提交按钮 -->
    <button
        :disabled="loading || !article.title || !aiEditor?.getHtml()"
        @click="submitArticle"
        class="w-full p-3 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="loading">正在提交...</span>
      <span v-else>{{ isEditing ? "保存修改" : "提交文章" }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const articleId = route.params.id || null;

const isEditing = ref(!!articleId); // 判断是否为编辑模式
const article = ref({ title: "", content: "" });
const loading = ref(false);
const editorContainer = ref(null);
let aiEditor: AiEditor | null = null;

onMounted(async () => {
  aiEditor = new AiEditor({
    element: editorContainer.value as Element,
    placeholder: "请输入文章内容...",
    content: article.value.content || "",
  });

  if (isEditing.value) {
    try {
      const { data } = await axios.get(`/api/articles/${articleId}`);
      article.value = data;
      aiEditor.setContent(data.content || "");
    } catch (error) {
      console.error("加载文章失败：", error);
    }
  }
});

const submitArticle = async () => {
  loading.value = true;
  try {
    const payload = {
      title: article.value.title,
      content: aiEditor?.getHtml() || "",
    };

    console.log("提交的文章数据:", payload);

    const response = await axios.post("/api/articles/upload", payload, {
      headers: { "Content-Type": "application/json" },
    });

    alert(isEditing.value ? "文章保存成功！" : "文章上传成功！");
    // 页面跳转带动过渡动画
    await router.push("/");
  } catch (error) {
    console.error("提交失败：", error);
    alert("提交失败，请检查后端日志！");
  } finally {
    loading.value = false;
  }
};

onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
    aiEditor = null;
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>