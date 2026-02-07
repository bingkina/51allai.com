/**
 * 自定义 Sitemap 生成器
 * - 排除 /search/index.html 页面
 * - 将标签和分类页的 priority 提升到 0.4
 */

'use strict';

const { createReadStream, createWriteStream, existsSync, writeFileSync } = require('fs');

hexo.extend.filter.register('before_exit', function () {
    const publicDir = hexo.public_dir;
    const sitemapPath = publicDir + 'sitemap.xml';

    if (!existsSync(sitemapPath)) {
        hexo.log.warn('Sitemap not found, skipping customization');
        return;
    }

    const fs = require('fs');
    let content = fs.readFileSync(sitemapPath, 'utf8');

    // 1. 移除 /search/index.html 相关的 URL 块
    const searchPattern = /<url>\s*<loc>[^<]*\/search\/index\.html<\/loc>[\s\S]*?<\/url>/g;
    content = content.replace(searchPattern, '');

    // 2. 将 tags 和 categories 页面的 priority 从 0.2 改为 0.4
    // 匹配 tags/ 或 categories/ 的 URL 块，并替换其中的 priority
    const urlBlockPattern = /(<url>\s*<loc>[^<]*\/(tags|categories)\/[^<]*<\/loc>[\s\S]*?<priority>)0\.2(<\/priority>[\s\S]*?<\/url>)/g;
    content = content.replace(urlBlockPattern, '$10.4$3');

    // 3. 清理可能产生的多余空行
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    fs.writeFileSync(sitemapPath, content, 'utf8');
    hexo.log.info('Sitemap customized: removed search page, updated tag/category priority to 0.4');
});
