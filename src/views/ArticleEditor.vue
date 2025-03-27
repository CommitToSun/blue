<!--
<template>
  <div class="p-4">
    &lt;!&ndash; 文章标题输入 &ndash;&gt;
    <input v-model="article.title" placeholder="文章标题" class="w-full p-2 border rounded-md mb-4" />

    &lt;!&ndash; 富文本编辑器 &ndash;&gt;
    <div class="border rounded-md" style="min-height: 500px;">
      <Editor v-model="article.content" :defaultConfig="editorConfig" mode="default" />
    </div>


    &lt;!&ndash; 发布文章按钮 &ndash;&gt;
    <button @click="submitArticle" class="mt-4 p-2 bg-blue-500 text-white rounded-md w-full">
      发布文章
    </button>


  </div>
</template>

<script>
import { ref } from "vue";
import { Editor } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";

export default {
  components: { Editor },
  setup() {
    const article = ref({ title: "", content: "" });

    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        uploadImage: {
          server: "http://localhost:8080/api/uploads", // 上传图片服务接口
          fieldName: "file", // 上传图片文件的字段名
          maxFileSize: 5 * 1024 * 1024, // 限制图片大小为 5MB
          allowedFileTypes: ["image/jpg", "image/png", "image/gif"], // 限制文件类型
          meta: {}, // 额外参数（如需）
          metaWithUrl: false, // 是否在meta中包含图片URL
          timeout: 10 * 1000, // 超时时间
          onSuccess(file, res) {
            if (!res || !res.url) {
              console.error("Failed to retrieve image URL from response:", res);
              return;
            }
            console.log("图片上传成功：", res.url);
            alert("图片上传成功！");
          },
          onFailed(file, res) {
            console.error("图片上传失败：", res);
            alert("图片上传失败，请重试！");
          },
          onError(file, err, res) {
            console.error("图片上传错误：", err, res);
            alert("图片上传发生错误！");
          },
        },
        uploadVideo: {
          server: "http://localhost:8080/api/video-uploads", // 上传视频服务接口
          fieldName: "video", // 上传视频文件的字段名
          maxFileSize: 20 * 1024 * 1024, // 限制视频大小为 20MB
          allowedFileTypes: ["video/mp4", "video/webm", "video/ogg"], // 限制视频文件类型
          meta: {}, // 额外参数（如需）
          metaWithUrl: false, // 是否在meta中包含视频URL
          timeout: 20 * 1000, // 超时时间
          onSuccess(file, res) {
            if (!res || !res.url) {
              console.error("Failed to retrieve video URL from response:", res);
              return;
            }
            console.log("视频上传成功：", res.url);
            alert("视频上传成功！");
          },
          onFailed(file, res) {
            console.error("视频上传失败：", res);
            alert("视频上传失败，请重试！");
          },
          onError(file, err, res) {
            console.error("视频上传错误：", err, res);
            alert("视频上传发生错误！");
          },
        },
      },

      // 工具栏菜单配置，确保菜单中包含上传图片和视频
      toolbarKeys: [
        "headerSelect", // 标题
        "bold", // 加粗
        "italic", // 斜体
        "underline", // 下划线
        "uploadImage", // 图片上传
        "uploadVideo", // 视频上传
        "link", // 超链接
        "blockquote", // 引用
        "unorderedList", // 无序列表
        "orderedList", // 有序列表
        "code", // 代码块
        "undo", // 撤销
        "redo", // 重做
      ],





    };


    // 提交文章方法
    const submitArticle = async () => {
      if (!article.value.title || !article.value.content) {
        alert("标题和内容不能为空！");
        return;
      }

      try {
        // 将文章数据发送到接口中
        const response = await fetch("http://localhost:8080/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(article.value),
        });

        if (!response.ok) throw new Error("请求失败");

        alert("文章发布成功！");
        article.value.title = "";
        article.value.content = "";
      } catch (error) {
        console.error("发布失败", error);
        alert("文章发布失败，请稍后再试！");
      }
    };

    return { article, editorConfig, submitArticle };
  },
};
</script>-->
