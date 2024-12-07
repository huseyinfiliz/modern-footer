import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class CustomFooter extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.open = false;

    const js = app.forum.attribute('modern-footer.js');
    if (js) {
      const sanitizedJS = js.trim();
      if (!sanitizedJS.includes('<script>')) {
        $('body').append(`<script>${sanitizedJS}</script>`);
      } else {
        console.warn('Potentially harmful JavaScript was not executed.');
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
                `© ${currentYear}, All Rights Reserved`}
            </p>
            <button class="Button Button--primary">
              <span class="Button-label">
                <a
                  href={app.forum.attribute('modern-footer.contact-link') || '#contact'}
                >
                  {app.forum.attribute('modern-footer.contact') || 'Contact'}
                </a>
              </span>
            </button>
          </div>

          <div class="foo-mid">
            <h3>{app.forum.attribute('modern-footer.title-2') || 'Links'}</h3>
            <ul>
              {[1, 2, 3, 4].map((i) => {
                const link = app.forum.attribute(`modern-footer.link-${i}`);
                const text = app.forum.attribute(`modern-footer.text-${i}`);
                const isExternalLink = link && !this.isInternalLink(link);
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
            <h3>{app.forum.attribute('modern-footer.title-3') || 'Links'}</h3>
            <ul>
              {[5, 6, 7, 8].map((i) => {
                const link = app.forum.attribute(`modern-footer.link-${i}`);
                const text = app.forum.attribute(`modern-footer.text-${i}`);
                const isExternalLink = link && !this.isInternalLink(link);
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
              {app.forum.attribute('modern-footer.title-4') || 'About'}
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

  isInternalLink(link) {
    if (link.startsWith('#')) {
      return true;
    }

    try {
      const url = new URL(link, window.location.origin);
      const currentHost = this.getRootDomain(window.location.hostname);
      const linkHost = this.getRootDomain(url.hostname);

      return currentHost === linkHost;
    } catch (e) {
      return false;
    }
  }

  getRootDomain(hostname) {
    const parts = hostname.split('.');
    const domain = parts.slice(parts.length - 2).join('.');
    return domain;
  }
}
