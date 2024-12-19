import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class InformationPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    this.fields = [
      // 'modern-footer.title-1' kaldırıldı
      'modern-footer.right-text',
      'modern-footer.contact',
      'modern-footer.contact-link',
      'modern-footer.contact-2',
      'modern-footer.contact-link-2',
      'modern-footer.contact-3',
      'modern-footer.contact-link-3',
      'modern-footer.contact-4',
      'modern-footer.contact-link-4',
    ];
    this.values = {};

    const settings = app.data.settings;
    this.fields.forEach((key) => (this.values[key] = Stream(settings[key] || '')));

    this.translationPrefix = 'huseyinfiliz-modern-footer.admin.settings.';
  }

  view() {
    const t = (key) => app.translator.trans(this.translationPrefix + key);

    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        <div className="container">
          {/* Forum Logo bölümü kaldırıldı */}

          {FieldSet.component({ label: t('about_us') }, [
            <div className="Form-group">
              <textarea
                className="FormControl"
                rows="10"
                bidi={this.values['modern-footer.right-text']}
              />
              <p className="helpText">{t('about_us_help')}</p>
            </div>,
          ])}

          {FieldSet.component({ label: `${t('social_media_button')} #1` }, [
            <div className="Form-group">
              <label>{t('font_awesome_icon')}</label>
              <input className="FormControl" bidi={this.values['modern-footer.contact']} placeholder="fas fa-link" />
            </div>,
            <div className="Form-group">
              <label>{t('social_link')}</label>
              <input
                className="FormControl"
                bidi={this.values['modern-footer.contact-link']}
                placeholder="https://www.example.com/username"
              />
            </div>,
          ])}

          {FieldSet.component({ label: `${t('social_media_button')} #2` }, [
            <div className="Form-group">
              <label>{t('font_awesome_icon')}</label>
              <input className="FormControl" bidi={this.values['modern-footer.contact-2']} placeholder="fas fa-link" />
            </div>,
            <div className="Form-group">
              <label>{t('social_link')}</label>
              <input
                className="FormControl"
                bidi={this.values['modern-footer.contact-link-2']}
                placeholder="https://www.example.com/username"
              />
            </div>,
          ])}

          {FieldSet.component({ label: `${t('social_media_button')} #3` }, [
            <div className="Form-group">
              <label>{t('font_awesome_icon')}</label>
              <input className="FormControl" bidi={this.values['modern-footer.contact-3']} placeholder="fas fa-link" />
            </div>,
            <div className="Form-group">
              <label>{t('social_link')}</label>
              <input
                className="FormControl"
                bidi={this.values['modern-footer.contact-link-3']}
                placeholder="https://www.example.com/username"
              />
            </div>,
          ])}

          {FieldSet.component({ label: `${t('social_media_button')} #4` }, [
            <div className="Form-group">
              <label>{t('font_awesome_icon')}</label>
              <input className="FormControl" bidi={this.values['modern-footer.contact-4']} placeholder="fas fa-link" />
            </div>,
            <div className="Form-group">
              <label>{t('social_link')}</label>
              <input
                className="FormControl"
                bidi={this.values['modern-footer.contact-link-4']}
                placeholder="https://www.example.com/username"
              />
            </div>,
          ])}

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
    this.fields.forEach((key) => {
      settings[key] = this.values[key]();
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
