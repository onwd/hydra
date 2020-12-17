import { Master } from '../../source/framework';
import { task } from './tasks/example-task';

const master = new Master({ task });

master.start();
