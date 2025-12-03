// 自定义脚本：品牌替换 + 汉化
(function() {
  // 1. 立即注入 CSS 隐藏需要翻译的元素（防止闪烁）
  const style = document.createElement('style');
  style.id = 'i18n-hide-style';
  style.textContent = `
    /* 隐藏需要翻译的 UI 元素 */
    #search-bar-entry,
    #search-bar-entry-mobile,
    .pagination,
    #table-of-contents-content,
    #footer {
      opacity: 0;
      transition: opacity 0.15s ease-in;
    }
    /* 翻译完成后显示 */
    .i18n-ready #search-bar-entry,
    .i18n-ready #search-bar-entry-mobile,
    .i18n-ready .pagination,
    .i18n-ready #table-of-contents-content,
    .i18n-ready #footer {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // 翻译映射表
  const translations = {
    'Search': '搜索',
    'Search...': '搜索...',
    'Search documentation': '搜索文档',
    'Search docs': '搜索文档',
    'On this page': '本页目录',
    'Was this page helpful?': '这篇文章有帮助吗？',
    'Yes': '有帮助',
    'No': '没帮助',
    'Previous': '上一篇',
    'Next': '下一篇',
    'Copy': '复制',
    'Copied': '已复制',
    'Copied!': '已复制！',
    'Ask AI': '问 AI',
    'Chat with AI': 'AI 对话',
    'Table of Contents': '目录',
    'Edit this page': '编辑此页',
    'Suggest edits': '建议修改',
    'Last updated': '最后更新',
    'Minutes to read': '分钟阅读',
    'min read': '分钟阅读',
    'Getting Started': '快速开始',
    'Introduction': '简介',
    'Overview': '概述',
    'Documentation': '文档',
    'API Reference': 'API 参考',
    'Resources': '资源',
    'Examples': '示例',
    'Guides': '指南',
    'No results found': '未找到结果',
    'No results': '无结果',
    'Try searching for something else': '试试搜索其他内容',
    'Not available on local preview': '本地预览不可用',
    'Not available in local preview': '本地预览不可用',
  };

  // 替换品牌
  function replaceBranding() {
    const links = document.querySelectorAll('a[href*="mintlify.com"]');
    links.forEach(link => {
      if (link.textContent.toLowerCase().includes('powered') ||
          link.textContent.toLowerCase().includes('mintlify')) {
        link.textContent = 'Powered by 丁少华';
        link.href = 'https://dingshaohua.com';
        link.target = '_blank';
      }
    });
  }

  // 汉化界面
  function translateUI() {
    // 遍历所有文本节点
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (translations[text]) {
        node.textContent = node.textContent.replace(text, translations[text]);
      }
    }

    // 翻译 placeholder 属性
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const placeholder = el.placeholder.trim();
      if (translations[placeholder]) {
        el.placeholder = translations[placeholder];
      }
    });

    // 翻译 aria-label 属性
    document.querySelectorAll('[aria-label]').forEach(el => {
      const label = el.getAttribute('aria-label').trim();
      if (translations[label]) {
        el.setAttribute('aria-label', translations[label]);
      }
    });

    // 翻译 title 属性
    document.querySelectorAll('[title]').forEach(el => {
      const title = el.getAttribute('title').trim();
      if (translations[title]) {
        el.setAttribute('title', translations[title]);
      }
    });
  }

  // 执行所有自定义操作
  function applyCustomizations() {
    replaceBranding();
    translateUI();
  }

  // 页面加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCustomizations);
  } else {
    applyCustomizations();
  }

  // 监听 DOM 变化（SPA 路由切换）
  let timeout;
  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(applyCustomizations, 100);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

