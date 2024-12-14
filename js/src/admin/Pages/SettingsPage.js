import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/components/Button';
import GeneralSettingsPage from './/GeneralSettingsPage';
import InformationPage from './/InformationPage';
import BlockTitlesPage from './/BlockTitlesPage';
import FirstLinksPage from './/FirstLinksPage';
import SecondLinksPage from './/SecondLinksPage';
import ThirdLinksPage from './/ThirdLinksPage';
import FourthLinksPage from './/FourthLinksPage';
import BottomPage from './/BottomPage';
import CustomJSPage from './/CustomJSPage';

export default class SettingsPage extends ExtensionPage {
  content() {
    const page = m.route.param('page') || 'general';

    return (
      <div className="SettingsPage">
        <div className="SettingsPage-menu">
          <ul>
            <li>
              <button
                className={page === 'general' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'general' }))}
              >
                <i className="fas fa-cogs"></i> General
              </button>
            </li>
            <li>
              <button
                className={page === 'info' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'info' }))}
              >
                <i className="fas fa-info-circle"></i> About
              </button>
            </li>
            <li>
              <button
                className={page === 'titles' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'titles' }))}
              >
                <i className="fas fa-th-large"></i> Blocks
              </button>
            </li>
            <li>
              <button
                className={page === 'links-1' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'links-1' }))}
              >
                <i className="fas fa-link"></i> Block #2
              </button>
            </li>
            <li>
              <button
                className={page === 'links-2' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'links-2' }))}
              >
                <i className="fas fa-link"></i> Block #3
              </button>
            </li>
            <li>
              <button
                className={page === 'links-3' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'links-3' }))}
              >
                <i className="fas fa-link"></i> Block #4
              </button>
            </li>
            <li>
              <button
                className={page === 'links-4' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'links-4' }))}
              >
                <i className="fas fa-link"></i> Block #5
              </button>
            </li>
            <li>
              <button
                className={page === 'bottom' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'bottom' }))}
              >
                <i className="fas fa-arrow-down"></i> Bottom
              </button>
            </li>
            <li>
              <button
                className={page === 'js' ? 'active' : ''}
                onclick={() => m.route.set(app.route('extension', { id: 'huseyinfiliz-modern-footer', page: 'js' }))}
              >
                <i className="fas fa-code"></i> Custom JS
              </button>
            </li>
          </ul>
        </div>

        <div className="SettingsPage-content">
          {page === 'general' && <GeneralSettingsPage />}
          {page === 'info' && <InformationPage />}
          {page === 'titles' && <BlockTitlesPage />}
          {page === 'links-1' && <FirstLinksPage />}
          {page === 'links-2' && <SecondLinksPage />}
          {page === 'links-3' && <ThirdLinksPage />}
          {page === 'links-4' && <FourthLinksPage />}
          {page === 'bottom' && <BottomPage />}
          {page === 'js' && <CustomJSPage />}
        </div>
      </div>
    );
  }
}
