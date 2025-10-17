import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class LinksBlock extends Component {
  view(vnode) {
    const { title, start, end, iconClass } = vnode.attrs;
    const links = this.generateLinks(start, end);

    return (
      <div class="foo-mid">
        <div>
          <h3>
            <i class={iconClass}></i> {title}
          </h3>
          <ul>{links}</ul>
        </div>
      </div>
    );
  }

  generateLinks(start, end) {
    const links = [];

    for (let i = start; i <= end; i++) {
      const link = app.forum.attribute(`modern-footer.link-${i}`);
      const text = app.forum.attribute(`modern-footer.text-${i}`);

      if (link && text) {
        links.push(
          <li key={link}>
            <a href={link} target={this.isExternalLink(link) ? '_blank' : undefined}>
              {text}
            </a>
          </li>
        );
      }
    }

    return links;
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
