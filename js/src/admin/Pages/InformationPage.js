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
      'modern-footer.title-1',
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
  }

  view() {
    return (
      <form onsubmit={this.onsubmit.bind(this)}>
        {FieldSet.component({ label: 'Forum Logo' }, [
          <label>
            Add the URL for the forum logo. If a valid URL is provided, the logo will be displayed. Alternatively, you can add a code such as
            <code>{' <i class="fas fa-link"></i> Title'}</code> to make it behave like other block titles.
          </label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.title-1']}
            placeholder="Enter forum logo URL or block title code"
          />,
        ])}

        {FieldSet.component({ label: 'About Us' }, [
          <label>Text Area: This field does not support HTML formatting. To create a new line, simply press the Enter key.</label>,
          <textarea
            className="FormControl"
            rows="10"
            bidi={this.values['modern-footer.right-text']}
            placeholder="Enter about us text"
          />,
        ])}

        {FieldSet.component({ label: 'Social Media Button #1' }, [
          <label>Font Awesome Icon</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact']}
            placeholder="fas fa-link"
          />,
          <label>Social Link</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-link']}
            placeholder="https://www.example.com/username"
          />,
        ])}

        {FieldSet.component({ label: 'Social Media Button #2' }, [
          <label>Font Awesome Icon</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-2']}
            placeholder="fas fa-link"
          />,
          <label>Social Link</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-link-2']}
            placeholder="https://www.example.com/username"
          />,
        ])}

        {FieldSet.component({ label: 'Social Media Button #3' }, [
          <label>Font Awesome Icon</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-3']}
            placeholder="fas fa-link"
          />,
          <label>Social Link</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-link-3']}
            placeholder="https://www.example.com/username"
          />,
        ])}

        {FieldSet.component({ label: 'Social Media Button #4' }, [
          <label>Font Awesome Icon</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-4']}
            placeholder="fas fa-link"
          />,
          <label>Social Link</label>,
          <input
            className="FormControl"
            bidi={this.values['modern-footer.contact-link-4']}
            placeholder="https://www.example.com/username"
          />,
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
