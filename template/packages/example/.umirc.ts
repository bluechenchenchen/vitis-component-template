import { defineConfig } from 'dumi';

export default defineConfig({
  title: '{{componentTitle}}',
  outputPath: 'docs',
  exportStatic: { 
    htmlSuffix: true 
  },
  mode: 'site',
  webpack5: {},
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history: {
    type: 'hash'
  },
  styles: [
    `
  .__dumi-default-layout {
    padding: 14px 108px 0 30px !important;
  }
  .__dumi-default-layout-toc {
    padding: 0 !important;
    width: 100px !important;
  }
  .__dumi-default-navbar,
  .__dumi-default-menu {
    display: none !important;
  }
  .markdown h1 {
    font-size: 22px;
  }
  .markdown h2 {
    font-size: 14px;
  }
  `
  ]
  // more config: https://d.umijs.org/config
});
