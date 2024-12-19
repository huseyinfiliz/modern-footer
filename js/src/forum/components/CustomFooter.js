import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import InfoBlock from './InfoBlock';
import LinksBlock from './LinksBlock';
import SocialButtons from './SocialButtons';
import CustomHtml from './CustomHtml';
import BottomBar from './BottomBar';

export default class CustomFooter extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.displayMode = parseInt(app.forum.attribute('modern-footer.display-mode'));
  }

  oncreate() {
    const customJS = app.forum.attribute('modern-footer.js');
    if (customJS) {
      const scriptElement = document.createRange().createContextualFragment(customJS);
      document.body.appendChild(scriptElement);
    }
  }

  view() {
    const showFooter = this.shouldShowFooter(this.displayMode);

    if (!showFooter) {
      return null;
    }

    const isInfoEnabled = app.forum.attribute('modern-footer.info-enabled') === '1';
    const isLegalEnabled = app.forum.attribute('modern-footer.links-1-enabled') === '1';
    const isLinksEnabled = app.forum.attribute('modern-footer.links-2-enabled') === '1';
    const isAboutEnabled = app.forum.attribute('modern-footer.links-3-enabled') === '1';
    const isOtherEnabled = app.forum.attribute('modern-footer.links-4-enabled') === '1';
    const isBottomEnabled = app.forum.attribute('modern-footer.bottom-enabled') === '1';

    return (
      <div>
        <div class="row">
          {isInfoEnabled && <InfoBlock />}
          {isLegalEnabled && (
            <LinksBlock title={app.forum.attribute('modern-footer.title-2')} start={1} end={6} iconClass={app.forum.attribute('modern-footer.title-fa-2')} />
          )}
          {isLinksEnabled && (
            <LinksBlock title={app.forum.attribute('modern-footer.title-3')} start={7} end={12} iconClass={app.forum.attribute('modern-footer.title-fa-3')} />
          )}
          {isAboutEnabled && (
            <LinksBlock title={app.forum.attribute('modern-footer.title-4')} start={13} end={18} iconClass={app.forum.attribute('modern-footer.title-fa-4')} />
          )}
          {isOtherEnabled && (
            <LinksBlock title={app.forum.attribute('modern-footer.title-5')} start={19} end={24} iconClass={app.forum.attribute('modern-footer.title-fa-5')} />
          )}
        </div>

        <CustomHtml />
        <BottomBar />
      </div>
    );
  }

  shouldShowFooter(displayMode) {
    const routeName = app.current.get('routeName');
    const mainRoute = routeName ? routeName.split('.')[0] : '';

    if (routeName === 'notifications' || routeName === 'flags') {
      return false;
    }

    const displayModeMap = {
      0: true,
      1: false,
      2: mainRoute !== 'discussion',
      3: mainRoute === 'index',
      4: true,
    };

    return displayModeMap[displayMode] !== undefined ? displayModeMap[displayMode] : true;
  }
}
