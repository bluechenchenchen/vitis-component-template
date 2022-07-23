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
  // more config: https://d.umijs.org/config
});
