import Component from 'flarum/common/Component';
import FieldSet from 'flarum/common/components/FieldSet';
import Button from 'flarum/common/components/Button';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Stream from 'flarum/common/utils/Stream';

export default class BottomPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    this.fields = ['modern-footer.copyright', 'modern-footer.html'];
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
          {/* Custom HTML FieldSet'i */}
          {FieldSet.component({ label: t('custom_html') }, [
            <div className="Form-group">
              <textarea className="FormControl" rows="10" bidi={this.values['modern-footer.html']} placeholder={t('custom_html')} />
            </div>,
          ])}

          {/* Bottom Section FieldSet'i */}
          {FieldSet.component({ label: t('bottom_section') }, [
            <div className="Form-group">
              <label>{t('text')}</label>
              <input className="FormControl" bidi={this.values['modern-footer.copyright']} />
              <p className="helpText">{t('bottom_help')}</p>
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
