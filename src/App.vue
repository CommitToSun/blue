<template>
  <div id="app">
    <transition
        name="fade-slide"
        mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<style>
/* 路由页面的淡入淡出和滑动动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>