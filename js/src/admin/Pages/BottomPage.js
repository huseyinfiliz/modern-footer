import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class BottomPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    this.fields = [
      'modern-footer.copyright',
    ];
    this.values = {};

    const settings = app.data.settings;
    this.fields.forEach((key) => (this.values[key] = Stream(settings[key] || '')));
  }

  view() {
    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        {FieldSet.component({ label: 'Bottom Section' }, [
          <div>
            <label>Bottom Text</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.copyright']}
              placeholder="Enter bottom section text"
            />
            <p className="helpText">
              Example: {`© 2024, All Rights Reserved`}
            </p>
          </div>,
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

    const settings = {};
    this.fields.forEach((key) => {
      settings[key] = this.values[key]();
    });

    saveSettings(settings)
      .then(() => {
        app.alerts.show({ type: 'success' }, 'Settings saved successfully!');
      })
      .catch(() => {
        app.alerts.show({ type: 'error' }, 'There was an error saving the settings.');
      })
      .finally(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
