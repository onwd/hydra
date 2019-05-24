import { Master } from '../../source/index';
import * as tasks from './tasks/index';

const master = new Master({ tasks });

master.start();
