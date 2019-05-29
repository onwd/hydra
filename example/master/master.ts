import { Master } from '../../source/index';
import task from './tasks/example-task';

const master = new Master({ task });

master.start();
