import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class BottomBar extends Component {
  view() {
    const isBottomEnabled = app.forum.attribute('modern-footer.bottom-enabled') === '1';
    const copyright = app.forum.attribute('modern-footer.copyright');

    return (
      isBottomEnabled && (
        <div class="foo-bottom">
          <p>{copyright || ''}</p>
        </div>
      )
    );
  }
}