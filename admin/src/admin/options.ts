import { AdminJSOptions } from 'adminjs';

import videoResource from '../resources/video.js';

import componentLoader from './component-loader.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [videoResource],
  databases: [],
};

export default options;
