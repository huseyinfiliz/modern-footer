import Component from 'flarum/common/Component';
import FieldSet from 'flarum/common/components/FieldSet';
import Button from 'flarum/common/components/Button';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Stream from 'flarum/common/utils/Stream';

export default class CustomJSPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;
    this.jsSetting = Stream(app.data.settings['modern-footer.js'] || '');
    this.translationPrefix = 'huseyinfiliz-modern-footer.admin.settings.';
  }

  view() {
    const t = (key) => app.translator.trans(this.translationPrefix + key);

    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        <div className="container">
          {FieldSet.component({ label: t('custom_js_code') }, [
            <div className="Form-group">
              <textarea className="FormControl" bidi={this.jsSetting} rows="10" />
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

    saveSettings({ 'modern-footer.js': this.jsSetting() })
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
