import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import GeneralSettingsPage from './GeneralSettingsPage';
import InformationPage from './InformationPage';
import BlockTitlesPage from './BlockTitlesPage';
import FirstLinksPage from './FirstLinksPage';
import SecondLinksPage from './SecondLinksPage';
import ThirdLinksPage from './ThirdLinksPage';
import FourthLinksPage from './FourthLinksPage';
import BottomPage from './BottomPage';
import CustomJSPage from './CustomJSPage';
import Stream from 'flarum/utils/Stream';

export default class SettingsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.settings = app.data.settings;
    this.settingsStream = Stream(this.settings);
  }

  content() {
    const page = m.route.param('page') || 'general';

    const translationPrefix = 'huseyinfiliz-modern-footer.admin.settings.';

    const t = (key) => app.translator.trans(translationPrefix + key);

    const generateBlockItems = () => {
      const blocks = [];
      const usedTitles = {};

      ['2', '3', '4', '5'].forEach((blockNumber) => {
        const titleKey = `modern-footer.title-${blockNumber}`;
        const iconKey = `modern-footer.title-fa-${blockNumber}`;

        let blockTitle = this.settingsStream()[titleKey] || t('block') + ` #${blockNumber}`;
        const blockIcon = this.settingsStream()[iconKey] || 'fas fa-link';

        if (usedTitles[blockTitle]) {
          blockTitle += ` #${blockNumber}`;
        }
        usedTitles[blockTitle] = true;

        const linkPageComponents = {
          2: FirstLinksPage,
          3: SecondLinksPage,
          4: ThirdLinksPage,
          5: FourthLinksPage,
        };

        blocks.push({
          key: `links-${blockNumber - 1}`,
          icon: blockIcon,
          label: blockTitle,
          component: linkPageComponents[blockNumber],
        });
      });

      return blocks;
    };

    // Define menu items
    const menuItems = [
      { key: 'general', icon: 'fas fa-cogs', label: t('general'), component: GeneralSettingsPage },
      { key: 'titles', icon: 'fas fa-th-large', label: t('blocks'), component: BlockTitlesPage },
      { key: 'info', icon: 'fas fa-info-circle', label: t('about'), component: InformationPage },
      ...generateBlockItems(),
      { key: 'bottom', icon: 'fas fa-arrow-down', label: t('bottom'), component: BottomPage },
      { key: 'js', icon: 'fas fa-code', label: t('custom_js'), component: CustomJSPage },
    ];

    // Render menu items
    const renderMenuItems = () => (
      <ul className="SettingsPage-menu-list">
        {menuItems.map(({ key, icon, label }) => (
          <li key={key}>
            <button
              className={`SettingsPage-menu-item ${page === key ? 'active' : ''}`}
              onclick={() => {
                m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: key }));
              }}
            >
              <i className={icon} /> {label}
            </button>
          </li>
        ))}
      </ul>
    );

    // Render the active page component
    const renderActivePage = () => {
      const activeItem = menuItems.find((item) => item.key === page);
      // Sadece BlockTitlesPage'e settingsStream'i geçiriyoruz
      return activeItem
        ? activeItem.key === 'titles'
          ? m(activeItem.component, { settingsStream: this.settingsStream })
          : m(activeItem.component)
        : m(GeneralSettingsPage);
    };

    return (
      <div className="SettingsPage">
        <div className="SettingsPage-menu">{renderMenuItems()}</div>
        <div className="SettingsPage-content">{renderActivePage()}</div>
      </div>
    );
  }

  // Ayarları yeniden yükleyen fonksiyon
  refreshSettings() {
    app.store.find('settings').then((settings) => {
      this.settingsStream(settings); // Ana Stream'i güncelliyoruz
      m.redraw(); // Sayfayı yeniden çiziyoruz
    });
  }
}
