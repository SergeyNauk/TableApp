import Data from './Data';
import Render from './Render';
import Listener from './Listener';

let data = new Data();
let render = new Render(data);
let listener = new Listener(data, render);

listener.initApp();
