import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CustomFooter from './components/CustomFooter';

app.initializers.add('huseyinfiliz-modern-footer', () => {
  extend(app.constructor.prototype, 'mount', () => {
    const footer = document.createElement('footer');
    footer.id = 'modern-footer';
    m.mount(document.body.appendChild(footer), CustomFooter);
  });
});