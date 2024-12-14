import Component from 'flarum/common/Component';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class GeneralSettingsPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    this.fields = [
      { key: 'modern-footer.info-enabled', label: 'Enable About Us Section' },
      { key: 'modern-footer.links-1-enabled', label: 'Enable Links 1 Section' },
      { key: 'modern-footer.links-2-enabled', label: 'Enable Links 2 Section' },
      { key: 'modern-footer.links-3-enabled', label: 'Enable Links 3 Section' },
      { key: 'modern-footer.links-4-enabled', label: 'Enable Links 4 Section' },
      { key: 'modern-footer.bottom-enabled', label: 'Enable Footer Bottom Section' },
      { key: 'modern-footer.mobile-tab', label: 'Mobile Tab Height' },
    ];

    this.values = {};

    const settings = app.data.settings;
    this.fields.forEach(({ key }) => {
      this.values[key] = Stream(settings[key] || (key.includes('enabled') ? '1' : ''));
    });
  }

  view() {
    return (
      <div className="GeneralSettings">
        <h3>Manage Footer Sections</h3>
        <form onsubmit={this.onsubmit.bind(this)}>
          {this.fields.map(({ key, label }) => (
            <div className="Form-group">
              {key.includes('enabled') ? (
                <label className={`Checkbox ${this.values[key]() === '1' ? 'on' : 'off'} Checkbox--switch`}>
                  <input
                    type="checkbox"
                    checked={this.values[key]() === '1'} // '1' kontrolü yapılmalı
                    onchange={(e) => this.values[key](e.target.checked ? '1' : '0')} // '1' veya '0' olarak güncelleniyor
                  />
                  <div className="Checkbox-display" aria-hidden="true"></div>
                  {label}
                </label>
              ) : (
                <div>
                  <label>{label}</label>
                  <input
                    className="FormControl"
                    type="text"
                    bidi={this.values[key]}
                    placeholder="Enter value (px or mobile-tab-height)"
                  />
                  {key === 'modern-footer.mobile-tab' && (
                    <p className="helpText">
                      If the <a href="https://discuss.flarum.org/d/28216-mobile-tab" target="_blank">Mobile Tab</a> extension is installed, you can use <code>var(--mobile-tab-height)</code> as the value.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          <button type="submit" className="Button Button--primary" disabled={this.saving}>
            Save Changes
          </button>
        </form>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.saving) return;

    this.saving = true;

    const settings = {};
    this.fields.forEach(({ key }) => {
      settings[key] = this.values[key]() || '0'; // '0' varsayılan değer
    });

    saveSettings(settings)
      .then(() => app.alerts.show({ type: 'success' }, 'Settings saved successfully.'))
      .finally(() => {
        this.saving = false;
        m.redraw(); // Sayfa yeniden render ediliyor
      });
  }
}
