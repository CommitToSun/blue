<template>
  <div
      class="h-screen flex bg-gray-100"
  >
    <!-- 主内容 -->
    <main
        :class="[
        'flex-1 flex flex-col justify-center items-center text-gray-800 transition-all duration-300',
        isSidebarOpen ? 'ml-64' : 'ml-0'
      ]"
    >
      <h1 class="text-4xl font-bold mb-6">欢迎来到小蓝书</h1>
      <p class="text-lg text-gray-500 mb-10">在这里，你可以记录和分享精彩文章</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link to="/articles/list" class="card">📖 文章列表</router-link>
        <router-link to="/articles/upload" class="card">✍️ 发布文章</router-link>
        <router-link to="/manage" class="card">🗑️ 管理文章</router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// 每次加载页面时回到顶部
onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<style scoped>
/* 主页面的样式保持 */
.nav-item {
  display: block;
  padding: 12px;
  font-size: 18px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* 主页卡片按钮 */
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>