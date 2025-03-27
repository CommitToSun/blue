<template>
  <div class="flex h-screen bg-gray-100">
<!--    &lt;!&ndash; 侧边栏 &ndash;&gt;
    <aside
        :class="['fixed h-full bg-gradient-to-b from-blue-600 to-indigo-800 text-white shadow-lg transition-all duration-300 z-10', isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full']"
    >
      <div class="p-5 flex justify-between items-center w-64">
        <h2 class="text-2xl font-semibold">小蓝书</h2>
        <button @click="toggleSidebar" class="text-white text-2xl focus:outline-none">✖</button>
      </div>
      <nav class="p-5 w-64">
        <router-link to="/articles/list" class="nav-item">📖 查看文章</router-link>
        <router-link to="/upload" class="nav-item">✍️ 发布文章</router-link>
        <router-link to="/manage" class="nav-item">🗑️ 管理文章</router-link>
      </nav>
    </aside>-->

    <!-- 侧边栏开关按钮 -->
<!--    <button
        v-if="!isSidebarOpen"
        @click="toggleSidebar"
        class="fixed top-5 left-5 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition z-20"
    >
      ☰
    </button>-->

    <!-- 主界面 -->
    <main :class="['flex-1 flex flex-col justify-center items-center text-gray-800 transition-all duration-300', isSidebarOpen ? 'ml-64' : 'ml-0']">
      <h1 class="text-4xl font-bold mb-6">欢迎来到小蓝书</h1>
      <p class="text-lg text-gray-500 mb-10">在这里，你可以记录和分享精彩文章</p>
      <div class="flex space-x-5">
        <router-link to="/articles/list" class="card">📖 文章列表</router-link>
        <router-link to="/articles/upload" class="card">✍️ 发布文章</router-link>
        <router-link to="/manage" class="card">🗑️ 管理文章</router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isSidebarOpen = ref(true);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
/*!* 侧边栏导航项 *!
.nav-item {
  display: block;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}*/

/* 主页卡片按钮 */
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 100px;
  font-size: 18px;
  font-weight: 600;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>