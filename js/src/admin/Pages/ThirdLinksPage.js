import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class ThirdLinksPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    // 6 bağlantı bölümü için alanlar oluştur
    this.sections = Array.from({ length: 6 }, (_, i) => ({
      titleKey: `modern-footer.text-${i + 13}`,
      urlKey: `modern-footer.link-${i + 13}`,
    }));

    this.values = {};

    const settings = app.data.settings;
    this.sections.forEach((section) => {
      this.values[section.titleKey] = Stream(settings[section.titleKey] || '');
      this.values[section.urlKey] = Stream(settings[section.urlKey] || '');
    });
  }

  view() {
    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        {this.sections.map((section, index) => {
          return FieldSet.component(
            { label: `Link #${index + 1}` },
            [
              <div className="LinkSection">
                <div>
                  <label>Link Text Field</label>
                  <input
                    className="FormControl"
                    bidi={this.values[section.titleKey]}
                    placeholder="Enter text"
                  />
                </div>
                <br />
                <div>
                  <label>URL Field</label>
                  <input
                    className="FormControl"
                    bidi={this.values[section.urlKey]}
                    placeholder="Enter URL"
                  />
                </div>
              </div>,
            ]
          );
        })}

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
    this.sections.forEach((section) => {
      settings[section.titleKey] = this.values[section.titleKey]();
      settings[section.urlKey] = this.values[section.urlKey]();
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
