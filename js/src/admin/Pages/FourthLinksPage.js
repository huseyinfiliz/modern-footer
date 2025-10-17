import Component from 'flarum/common/Component';
import FieldSet from 'flarum/common/components/FieldSet';
import Button from 'flarum/common/components/Button';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Stream from 'flarum/common/utils/Stream';

export default class FourthLinksPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    // 6 bağlantı bölümü için alanlar oluştur
    this.sections = Array.from({ length: 6 }, (_, i) => ({
      titleKey: `modern-footer.text-${i + 19}`,
      urlKey: `modern-footer.link-${i + 19}`,
    }));

    this.values = {};

    const settings = app.data.settings;
    this.sections.forEach((section) => {
      this.values[section.titleKey] = Stream(settings[section.titleKey] || '');
      this.values[section.urlKey] = Stream(settings[section.urlKey] || '');
    });

    this.translationPrefix = 'huseyinfiliz-modern-footer.admin.settings.';
  }

  view() {
    const t = (key) => app.translator.trans(this.translationPrefix + key);

    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        <div className="container">
          {this.sections.map((section, index) => (
            <FieldSet key={index} label={`${t('link')} #${index + 1}`}>
              <div className="LinkSection">
                <div className="Form-group">
                  <label>{t('text')}</label>
                  <input className="FormControl" bidi={this.values[section.titleKey]} placeholder={t('text')} />
                </div>
                <div className="Form-group">
                  <label>{t('link')}</label>
                  <input className="FormControl" bidi={this.values[section.urlKey]} placeholder={t('link')} />
                </div>
              </div>
            </FieldSet>
          ))}

          <div className="Form-group">
            {Button.component(
              {
                type: 'submit',
                className: 'Button Button--primary',
                loading: this.saving,
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
    this.sections.forEach((section) => {
      settings[section.titleKey] = this.values[section.titleKey]();
      settings[section.urlKey] = this.values[section.urlKey]();
    });

    saveSettings(settings)
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
