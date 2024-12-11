import './styles.css';

import { add, subtract } from './util.js';
import { greet } from './helper';
import _ from 'lodash'; // Node.js module (this won't work without resolve plugin)
const moment = require('moment'); // CommonJS module (not written in ES6, needs to be converted to be included in rollup bundle)

console.log('Add:', add(2, 3));
console.log('Subtract:', subtract(5, 2));
console.log(greet('Rollup'));
console.log(_.capitalize('hello rollup'));
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

async function loadModule(moduleName) {

    if (moduleName === 'math') {
      const { add } = await import('./dynamicImport1.js');
      console.log(add(2, 3));
    } else if (moduleName === 'string') {
      const { toUpperCase } = await import('./dynamicImport2.js');
      console.log(toUpperCase('hello'));
    }

}

loadModule('math');