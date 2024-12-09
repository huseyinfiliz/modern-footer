import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class CustomFooter extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.open = false;

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
    const currentYear = new Date().getFullYear();
    const currentDomain = window.location.hostname;

    return (
      <footer>
        <div class="row">
          <div class="foo-left">
            <h3>
              {m.trust(
                app.forum.attribute('modern-footer.title-1') ||
                  window.location.hostname 
              )}
            </h3>
            <p>
              {app.forum.attribute('modern-footer.copyright') ||
                ``}
            </p>
            <button class="Button Button--primary">
              <span class="Button-label">
                <a
                  href={app.forum.attribute('modern-footer.contact-link') || '#contact'}
                >
                  {m.trust(app.forum.attribute('modern-footer.contact') || '<i class="fas fa-envelope"></i>')}
                </a>
              </span>
            </button>
          </div>

          <div class="foo-mid">
            <h3>{app.forum.attribute('modern-footer.title-2') || ''}</h3>
            <ul>
              {[1, 2, 3, 4].map((i) => {
                const link = app.forum.attribute(`modern-footer.link-${i}`);
                const text = app.forum.attribute(`modern-footer.text-${i}`);
                const isExternalLink = link && this.isExternalLink(link);
                return link && text ? (
                  <li>
                    <a
                      href={link || '#'}
                      target={isExternalLink ? '_blank' : undefined}
                    >
                      {text}
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div class="foo-mid">
            <h3>{app.forum.attribute('modern-footer.title-3') || ''}</h3>
            <ul>
              {[5, 6, 7, 8].map((i) => {
                const link = app.forum.attribute(`modern-footer.link-${i}`);
                const text = app.forum.attribute(`modern-footer.text-${i}`);
                const isExternalLink = link && this.isExternalLink(link);
                return link && text ? (
                  <li>
                    <a
                      href={link || '#'}
                      target={isExternalLink ? '_blank' : undefined}
                    >
                      {text}
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div class="foo-right">
            <h3>
              {app.forum.attribute('modern-footer.title-4') || ''}
            </h3>
            <p>
              {m.trust(
                app.forum.attribute('modern-footer.right-text') || ''
              )}
            </p>
          </div>
        </div>
      </footer>
    );
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
