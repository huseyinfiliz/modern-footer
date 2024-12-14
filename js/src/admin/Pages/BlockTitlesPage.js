import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class BlockTitlesPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    this.fields = [
      'modern-footer.title-2',
      'modern-footer.title-fa-2',
      'modern-footer.title-3',
      'modern-footer.title-fa-3',
      'modern-footer.title-4',
      'modern-footer.title-fa-4',
      'modern-footer.title-5',
      'modern-footer.title-fa-5',
    ];
    this.values = {};

    const settings = app.data.settings;
    this.fields.forEach((key) => (this.values[key] = Stream(settings[key] || '')));
  }

  view() {
    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        {FieldSet.component({ label: 'Block 2' }, [
          <div>
            <label>Font Awesome Icon</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-fa-2']}
              placeholder="fas fa-link"
            />
          </div>,
          <div>
            <label>Title</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-2']}
              placeholder="Enter title"
            />
          </div>,
        ])}

        {FieldSet.component({ label: 'Block 3' }, [
          <div>
            <label>Font Awesome Icon</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-fa-3']}
              placeholder="fas fa-link"
            />
          </div>,
          <div>
            <label>Title</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-3']}
              placeholder="Enter title"
            />
          </div>,
        ])}

        {FieldSet.component({ label: 'Block 4' }, [
          <div>
            <label>Font Awesome Icon</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-fa-4']}
              placeholder="fas fa-link"
            />
          </div>,
          <div>
            <label>Title</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-4']}
              placeholder="Enter title"
            />
          </div>,
        ])}

        {FieldSet.component({ label: 'Block 5' }, [
          <div>
            <label>Font Awesome Icon</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-fa-5']}
              placeholder="fas fa-link"
            />
          </div>,
          <div>
            <label>Title</label>
            <input
              className="FormControl"
              bidi={this.values['modern-footer.title-5']}
              placeholder="Enter title"
            />
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
