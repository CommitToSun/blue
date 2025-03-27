import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import UploadArticle from "../views/UploadArticle.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import ArticleList from "../views/ArticleList.vue";
/*import ArticleEditor from "../views/ArticleEditor.vue";*/

const routes = [
    { path: "/", component: Home },
    { path: "/articles/upload", component: UploadArticle },
    { path: "/articles/:id", component: ArticleDetail },
    { path: "/articles/list", component: ArticleList }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
