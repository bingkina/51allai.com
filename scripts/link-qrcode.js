// 社交链接悬停弹出二维码功能
// 为配置了 qrcode 字段的链接图标添加鼠标悬停弹出图片效果

// 注入弹出层 CSS 样式
hexo.extend.injector.register('head_end', `<style>
/* 链接按钮容器需要 relative 定位 */
.link-btn {
  position: relative;
}

/* 弹出层样式 */
.link-qrcode-popup {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 100;
  background: var(--card-bg, #fff);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 悬停时显示 */
.link-btn:hover .link-qrcode-popup {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

/* 弹出层内的图片 */
.link-qrcode-popup img {
  display: block;
  width: 140px;
  height: 140px;
  object-fit: contain;
  border-radius: 8px;
}

/* 弹出层名称标签 */
.link-qrcode-popup .qrcode-label {
  text-align: center;
  font-size: 12px;
  color: var(--text-on-light, #666);
  margin-top: 4px;
  line-height: 1.4;
  white-space: nowrap;
}

/* 底部箭头指示器 */
.link-qrcode-popup::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: var(--card-bg, #fff);
  border-radius: 2px;
  rotate: 45deg;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
}
</style>`);

// 通过 after_render:html 过滤器注入弹出层 HTML
hexo.extend.filter.register('after_render:html', function (str) {
    const links = hexo.theme.config.links;
    if (!links || !Array.isArray(links)) return str;

    // 遍历所有配置了 qrcode 的链接
    for (const link of links) {
        if (!link.qrcode) continue;

        const qrcodeUrl = '/' + link.qrcode.replace(/^\//, '');
        const popupHtml = `<div class="link-qrcode-popup"><img src="${qrcodeUrl}" alt="${link.name}"><div class="qrcode-label">${link.name}</div></div>`;

        // 找到对应链接的 </a> 标签，在其前面插入弹出层
        // 通过 title 属性精确匹配链接
        const titleAttr = `title="${link.name}"`;
        const regex = new RegExp(
            `(<a[^>]*class="link-btn"[^>]*${escapeRegExp(titleAttr)}[^>]*>)([\\s\\S]*?)(</a>)`,
            'g'
        );
        str = str.replace(regex, `$1$2${popupHtml}$3`);
    }

    return str;
});

// 辅助函数：转义正则特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
