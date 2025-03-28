<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">{{ isEditing ? "编辑文章" : "上传文章" }}</h2>

    <!-- 文章标题输入框 -->
    <input
        v-model="article.title"
        placeholder="请输入文章标题"
        class="w-full p-6 text-2xl border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-4 focus:ring-blue-500"
    />

    <!-- 文章内容编辑器 -->
    <div ref="editorContainer" class="border border-gray-300 rounded-md mb-6" style="height: 400px"></div>

    <!-- 提交按钮 -->
    <button
        :disabled="loading"
        @click="submitArticle"
        class="mt-6 w-full p-3 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600 disabled:opacity-50"
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

// 状态变量
const isEditing = ref(!!articleId); // 判断是否为编辑模式
const article = ref({
  title: "",
  content: "", // 初始文章内容
});
const loading = ref(false);
const editorContainer = ref(null);
let aiEditor: AiEditor | null = null;

// 初始化编辑器和加载文章数据
onMounted(async () => {
  // 初始化编辑器
  aiEditor = new AiEditor({
    element: editorContainer.value as Element,
    placeholder: "请输入文章内容...",
    content: article.value.content || "",
  });

  // 如果是编辑模式，加载文章数据
  if (isEditing.value) {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/articles/${articleId}`);
      article.value = data; // 将数据赋值
      aiEditor.setContent(data.content || ""); // 将内容设置到编辑器中
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

    console.log("即将提交的文章数据:", payload);

    const response = await axios.post("http://localhost:8080/api/articles/upload", payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("提交成功:", response.data);
    alert("文章提交成功！");
    await router.push("/");
  } catch (error) {
    console.error("提交失败：", error);
    alert("提交失败，请检查后端日志！");
  } finally {
    loading.value = false;
  }
};

// 卸载时销毁编辑器
onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
    aiEditor = null;
  }
});
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>