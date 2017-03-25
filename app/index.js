import 'babel-polyfill';
import { render } from 'react-dom';
import router from './routes';

render(
  router,
  document.getElementById('root')
);


