import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class SocialButtons extends Component {
  view() {
    const fields = [
      { icon: app.forum.attribute('modern-footer.contact'), link: app.forum.attribute('modern-footer.contact-link') },
      { icon: app.forum.attribute('modern-footer.contact-2'), link: app.forum.attribute('modern-footer.contact-link-2') },
      { icon: app.forum.attribute('modern-footer.contact-3'), link: app.forum.attribute('modern-footer.contact-link-3') },
      { icon: app.forum.attribute('modern-footer.contact-4'), link: app.forum.attribute('modern-footer.contact-link-4') },
    ];

    return fields
      .filter((field) => field.icon && field.link)
      .map((field) => {
        const icon = field.icon.startsWith('fa') ? field.icon : 'fas fa-link';
        const link = field.link;

        return (
          <button class="Button Button Social" key={link}>
            <span class="Button-label">
              <a href={link} target={this.isExternalLink(link) ? '_blank' : undefined}>
                <i class={icon}></i>
              </a>
            </span>
          </button>
        );
      });
  }
    isExternalLink(link) {
    try {
      const url = new URL(link, window.location.origin);
      return this.normalizeHostname(window.location.hostname) !== this.normalizeHostname(url.hostname);
    } catch (e) {
      return false;
    }
  }

  normalizeHostname(hostname) {
    return hostname.replace(/^www\./, '');
  }
}
