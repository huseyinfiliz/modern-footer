import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Stream from 'flarum/utils/Stream';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';

export default class GeneralSettingsPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.translationPrefix = 'huseyinfiliz-modern-footer.admin.settings.';

    this.fields = [
      { key: 'modern-footer.info-enabled', translationKey: 'about' },
      { key: 'modern-footer.links-1-enabled', translationKey: 'block', blockNumber: 2 },
      { key: 'modern-footer.links-2-enabled', translationKey: 'block', blockNumber: 3 },
      { key: 'modern-footer.links-3-enabled', translationKey: 'block', blockNumber: 4 },
      { key: 'modern-footer.links-4-enabled', translationKey: 'block', blockNumber: 5 },
      { key: 'modern-footer.bottom-enabled', translationKey: 'bottom_section' },
      { key: 'modern-footer.mobile-tab', translationKey: 'mobile_tab_height' },
      { key: 'modern-footer.display-mode', translationKey: 'display_mode' },
    ];

    this.values = {};
    // usedTitles'ı blockNumber ile indekslemek için objeye çeviriyoruz
    this.usedTitles = {};

    this.fields.forEach(({ key, blockNumber }) => {
      if (blockNumber) {
        const titleKey = `modern-footer.title-${blockNumber}`;
        const blockTitle = app.data.settings[titleKey];
        const t = (key) => app.translator.trans(this.translationPrefix + key);

        // Varsayılan değeri belirliyoruz
        let uniqueBlockTitle = `${t('block')} #${blockNumber}`;

        // Eğer app.data.settings'de bu blockNumber için bir değer varsa onu kullanıyoruz
        if (blockTitle !== undefined) {
          uniqueBlockTitle = blockTitle;
        }

        // Bu blockNumber'ın title'ının kullanıldığını işaretliyoruz
        this.usedTitles[blockNumber] = true;

        // app.data.settings'e kaydediyoruz
        app.data.settings[titleKey] = uniqueBlockTitle;
      }

      this.values[key] = Stream(app.data.settings[key] || (key.includes('enabled') ? '1' : key === 'modern-footer.display-mode' ? '0' : ''));

      this.values[key].map((value) => {
        app.data.settings[key] = value;
      });
    });

    this.saving = false;
  }

  view() {
    const t = (key) => app.translator.trans(this.translationPrefix + key);

    return (
      <div className="GeneralSettings">
        {/* Display Mode ayarı ilk sıraya taşındı */}
        <FieldSet label={t('display_mode')}>
          <div className="Form-group">
            <select
              className="FormControl"
              value={this.values['modern-footer.display-mode']()}
              onchange={(e) => this.values['modern-footer.display-mode'](e.target.value)}
              disabled={this.values['modern-footer.display-mode']() === '4'}
            >
              <option value="0">{t('all_pages')}</option>
              <option value="1">{t('hide_everywhere')}</option>
              <option value="2">{t('hide_on_discussions')}</option>
              <option value="3">{t('hide_except_index')}</option>
              <option value="4" disabled>
                {t('custom')}
              </option>
            </select>
          </div>
        </FieldSet>

        <FieldSet label={t('manage_footer_sections')}>
          {this.fields
            .filter(({ key }) => key.includes('-enabled'))
            .map(({ key, translationKey, blockNumber }) => (
              <div className="Form-group" key={key}>
                <label className={`Checkbox ${this.values[key]() === '1' ? 'on' : 'off'} Checkbox--switch`}>
                  <input type="checkbox" checked={this.values[key]() === '1'} onchange={(e) => this.values[key](e.target.checked ? '1' : '0')} />
                  <div className="Checkbox-display" aria-hidden="true"></div>
                  {/* Blok başlıklarını doğrudan app.data.settings'den alıyoruz */}
                  {blockNumber ? app.data.settings[`modern-footer.title-${blockNumber}`] || `${t('block')} #${blockNumber}` : t(translationKey)}
                </label>
              </div>
            ))}
        </FieldSet>

        <FieldSet label={t('mobile_tab_height')}>
          <div className="Form-group">
            <input className="FormControl" type="text" bidi={this.values['modern-footer.mobile-tab']} placeholder="var(--mobile-tab-height) / 54px" />
            <p className="helpText">{t('mobile_tab_height_help')}</p>
          </div>
        </FieldSet>

        <div className="Form-group">
          {Button.component(
            {
              className: 'Button Button--primary',
              type: 'button',
              onclick: this.confirm.bind(this),
              loading: this.saving,
            },
            app.translator.trans('core.admin.settings.submit_button')
          )}
        </div>
      </div>
    );
  }

  confirm() {
    const settingsToSave = {};
    this.fields.forEach(({ key }) => {
      settingsToSave[key] = this.values[key]();
    });

    this.saving = true;
    saveSettings(settingsToSave)
      .then(() => {
        app.alerts.show({ type: 'success' }, app.translator.trans('core.admin.settings.saved_message'));
      })
      .catch(() => {})
      .finally(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
