import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class CustomJSPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;
    this.jsSetting = Stream(app.data.settings['modern-footer.js'] || '');
  }

  view() {
    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        {FieldSet.component({ label: 'Custom JavaScript Settings' }, [
          <textarea
            className="FormControl"
            bidi={this.jsSetting}
            placeholder="Enter your custom JavaScript here"
            rows="10"
          ></textarea>,
        ])}

        <Button type="submit" className="Button Button--primary" loading={this.saving}>
          Save
        </Button>
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
      .catch(() => {
        app.alerts.show({ type: 'error' }, app.translator.trans('core.lib.error.generic_message'));
      })
      .finally(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
