import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class CustomHtml extends Component {
  view() {
    const customHtml = app.forum.attribute('modern-footer.html');

    return customHtml && <div class="foo-custom-html">{m.trust(customHtml)}</div>;
  }
}
