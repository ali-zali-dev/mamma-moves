import { AdminJSOptions } from 'adminjs';

import videoResource from '../resources/video.js';
import userResource from '../resources/user.js';
import planResource from '../resources/plan.js';
import userPlanResource from '../resources/userPlan.js';

import componentLoader from './component-loader.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    videoResource,
    userResource,
    planResource,
    userPlanResource,
  ],
  databases: [],
};

export default options;
