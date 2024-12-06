import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class ModernFooter extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.open = false;

    const js = app.forum.attribute('huseyinfiliz-modern-footer.js');
    if (js) {
      $('body').append(`<script>${js.trim()}</script>`);
    }
  }

  view() {
    return (
      <div id="ModernFooter" className={this.open && 'showing'}>
        <div className="container">
          <div className="Footer--Content" style={`height: ${this.open ? app.forum.attribute('huseyinfiliz-modern-footer.height') || 50 : 0}px;`}>
            {m.trust(app.forum.attribute('huseyinfiliz-modern-footer.text') || '')}
          </div>
          <div className="Footer--Icons">
            <i className={`Footer--Show fas fa-info-circle ${this.open && 'hidden'}`} onclick={() => (this.open = true)} />
            <i className={`Footer--Hide fas fa-caret-down ${!this.open && 'hidden'}`} onclick={() => (this.open = false)} />
          </div>
        </div>
      </div>
    );
  }
}
