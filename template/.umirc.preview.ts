import { defineConfig } from 'umi';

export default defineConfig({
  title: '预览',
  outputPath: 'dist',
  publicPath: '/',
  exportStatic: undefined,
  nodeModulesTransform: {
    type: 'none',
  },
  base: '/',
  routes: [
    { path: '/', component: '@/preview/index' },
  ],
  fastRefresh: {},
});
