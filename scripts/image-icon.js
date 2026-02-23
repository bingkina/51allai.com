// 将链接图标中的图片文件名（如 xiaohongshu.png）转换为 <img> 标签
// 解决主题模板默认只支持 Font Awesome class 的问题
hexo.extend.filter.register('after_render:html', function(str) {
  return str.replace(
    /<i class="([^"]+\.(png|jpg|jpeg|gif|svg|webp|ico))">\s*<\/i>/gi,
    '<img class="link-icon-img" src="/$1" alt="icon">'
  );
});

// 注入图片图标的 CSS 样式
hexo.extend.injector.register('head_end', `<style>
.link-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>`);
