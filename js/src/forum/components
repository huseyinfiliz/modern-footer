import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class CustomFooter extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    const js = app.forum.attribute('modern-footer.js');
    if (js) {
      const sanitizedJS = js.trim();
      const jsWithoutComments = sanitizedJS
        .replace(/<!--[\s\S]*?-->/g, '') 
        .replace(/\/\*[\s\S]*?\*\//g, '') 
        .replace(/\/\/[^\n\r]*/g, '') 
        .trim();

      if (
        jsWithoutComments.startsWith('<script') &&
        jsWithoutComments.endsWith('</script>')
      ) {
        $('body').append(sanitizedJS);
      } else {
        $('body').append(`<script>${jsWithoutComments}</script>`);
      }
    }
  }

  view() {
    const isInfoEnabled = app.forum.attribute('modern-footer.info-enabled') === '1';
    const isLegalEnabled = app.forum.attribute('modern-footer.links-1-enabled') === '1';
    const isLinksEnabled = app.forum.attribute('modern-footer.links-2-enabled') === '1';
    const isAboutEnabled = app.forum.attribute('modern-footer.links-3-enabled') === '1';
    const isOtherEnabled = app.forum.attribute('modern-footer.links-4-enabled') === '1';
    const isBottomEnabled = app.forum.attribute('modern-footer.bottom-enabled') === '1';

    return (
      <div>
        <div class="row">
          {isInfoEnabled && this.renderInfoBlock()}
          {isLegalEnabled && this.renderLinksBlock(app.forum.attribute('modern-footer.title-2'), 1, 6, app.forum.attribute('modern-footer.title-fa-2'))}
          {isLinksEnabled && this.renderLinksBlock(app.forum.attribute('modern-footer.title-3'), 7, 12, app.forum.attribute('modern-footer.title-fa-3'))}
          {isAboutEnabled && this.renderLinksBlock(app.forum.attribute('modern-footer.title-4'), 13, 18, app.forum.attribute('modern-footer.title-fa-4'))}
          {isOtherEnabled && this.renderLinksBlock(app.forum.attribute('modern-footer.title-5'), 19, 24, app.forum.attribute('modern-footer.title-fa-5'))}
        </div>

        {/* Alt Bilgi (foo-bottom) */}
        {isBottomEnabled && (
          <div class="foo-bottom">
            <p>{app.forum.attribute('modern-footer.copyright') || ''}</p>
          </div>
        )}
      </div>
    );
  }

  renderInfoBlock() {
    const titleContent = app.forum.attribute('modern-footer.title-1')?.trim();
    const rightText = app.forum.attribute('modern-footer.right-text') || '';

    return (
      <div class="foo-left">
        <div>
          {titleContent ? (
            titleContent.startsWith('http') ? (
              <h3>
                <img src={titleContent} alt="Footer Logo" />
              </h3>
            ) : (
              <h3>{m.trust(titleContent)}</h3>
            )
          ) : null}
          {rightText && <p>{rightText}</p>}
          {this.renderSocialButtons()}
        </div>
      </div>
    );
  }

  renderLinksBlock(title, start, end, iconClass) {
    return (
      <div class="foo-mid">
        <div>
          <h3>
            <i class={iconClass}></i> {title}
          </h3>
          <ul>
            {this.renderLinks(start, end)}
          </ul>
        </div>
      </div>
    );
  }

  renderSocialButtons() {
    const fields = [
      { icon: app.forum.attribute('modern-footer.contact'), link: app.forum.attribute('modern-footer.contact-link') },
      { icon: app.forum.attribute('modern-footer.contact-2'), link: app.forum.attribute('modern-footer.contact-link-2') },
      { icon: app.forum.attribute('modern-footer.contact-3'), link: app.forum.attribute('modern-footer.contact-link-3') },
      { icon: app.forum.attribute('modern-footer.contact-4'), link: app.forum.attribute('modern-footer.contact-link-4') },
    ];

    return fields.map((field) => {
      if (!field.icon && !field.link) {
        return null;
      }

      if (!field.icon || !field.icon.startsWith('fa')) {
        field.icon = 'fas fa-link';
      }

      const link = field.link || '#';

      return (
        <button class="Button Button Social">
          <span class="Button-label">
            <a href={link} target={this.isExternalLink(link) ? '_blank' : undefined}>
              <i class={field.icon}></i>
            </a>
          </span>
        </button>
      );
    });
  }

  renderLinks(start, end) {
    const links = [];
    for (let i = start; i <= end; i++) {
      const link = app.forum.attribute(`modern-footer.link-${i}`);
      const text = app.forum.attribute(`modern-footer.text-${i}`);
      if (link && text) {
        links.push(
          <li>
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
      const currentHost = this.normalizeHostname(window.location.hostname);
      const linkHost = this.normalizeHostname(url.hostname);

      return currentHost !== linkHost;
    } catch (e) {
      return false;
    }
  }

  normalizeHostname(hostname) {
    return hostname.replace(/^www\./, '');
  }
}
