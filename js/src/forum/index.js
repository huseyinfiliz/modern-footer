import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ForumApplication from 'flarum/forum/ForumApplication';

import CustomFooter from './components/CustomFooter';

app.initializers.add('huseyinfiliz-modern-footer', () => {
  extend(ForumApplication.prototype, 'mount', () => {
    const footer = document.createElement('footer');

    const mobileTabHeight = app.forum.attribute('modern-footer.mobile-tab') || '0px';

    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        footer {
          padding-bottom: ${mobileTabHeight};
        }
      }
    `;
    document.head.appendChild(style);

    m.mount(document.body.appendChild(footer), CustomFooter);
  });
});
