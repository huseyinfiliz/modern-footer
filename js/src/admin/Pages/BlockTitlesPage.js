import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class BlockTitlesPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;
    this.translationPrefix = 'huseyinfiliz-modern-footer.admin.settings.';
    this.settingsStream = this.attrs.settingsStream;

    this.blocks = [
      // Forum Logo bloğu eklendi
      { id: '1', titleKey: 'modern-footer.title-1' },
      { id: '2', iconKey: 'modern-footer.title-fa-2', titleKey: 'modern-footer.title-2' },
      { id: '3', iconKey: 'modern-footer.title-fa-3', titleKey: 'modern-footer.title-3' },
      { id: '4', iconKey: 'modern-footer.title-fa-4', titleKey: 'modern-footer.title-4' },
      { id: '5', iconKey: 'modern-footer.title-fa-5', titleKey: 'modern-footer.title-5' },
    ];

    this.values = {};

    this.blocks.forEach(({ iconKey, titleKey }) => {
      // iconKey undefined gelirse boş Stream ata
      this.values[iconKey] = Stream(iconKey ? this.settingsStream()[iconKey] || '' : '');
      this.values[titleKey] = Stream(this.settingsStream()[titleKey] || '');

      // Sadece titleKey için map fonksiyonunu kullanıyoruz
      this.values[titleKey].map((value) => {
        const currentSettings = this.settingsStream();
        currentSettings[titleKey] = value;
        this.settingsStream(currentSettings);
      });
    });
  }

  view() {
    const t = (key) => app.translator.trans(this.translationPrefix + key);

    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        <div className="container">
          {this.blocks.map(({ id, iconKey, titleKey }) => (
            <FieldSet key={id} label={`${t('block')} ${id}`}>
              {/* id 1 ise Forum Logo bölümünü göster */}
              {id === '1' && (
                <div className="Form-group">
                  <label>{t('forum_logo')}</label>
                  <input className="FormControl" bidi={this.values[titleKey]} />
                  <p className="helpText">
                    {t('forum_logo_help')}
                    <code>
                      {' <i class="fas fa-link"></i> '} {t('title')}
                    </code>
                  </p>
                </div>
              )}
              {/* id 1 değilse diğer blokları göster */}
              {id !== '1' && (
                <>
                  <div className="Form-group">
                    <label>{t('font_awesome_icon')}</label>
                    <input className="FormControl" bidi={this.values[iconKey]} placeholder="fas fa-link" />
                  </div>
                  <div className="Form-group">
                    <label>{t('title')}</label>
                    <input className="FormControl" bidi={this.values[titleKey]} placeholder={t('title')} />
                  </div>
                </>
              )}
            </FieldSet>
          ))}

          {/* Kaydet Butonu */}
          <div className="Form-group">
            {Button.component(
              {
                type: 'submit',
                className: 'Button Button--primary',
                loading: this.saving,
                disabled: this.saving,
              },
              app.translator.trans('core.admin.settings.submit_button')
            )}
          </div>
        </div>
      </form>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.saving) return;

    this.saving = true;

    const settings = {};

    this.blocks.forEach(({ iconKey, titleKey }) => {
      // iconKey undefined gelirse atlama
      if (iconKey) settings[iconKey] = this.values[iconKey]();
      settings[titleKey] = this.values[titleKey]();
    });

    const currentSettings = this.settingsStream();
    Object.assign(currentSettings, settings);
    this.settingsStream(currentSettings);

    saveSettings(settings)
      .then(() => {
        app.alerts.show({ type: 'success' }, app.translator.trans('core.admin.settings.saved_message'));
        this.attrs.refreshSettings?.();
      })
      .catch(() => {})
      .finally(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
