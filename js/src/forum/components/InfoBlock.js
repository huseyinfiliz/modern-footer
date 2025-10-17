import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import SocialButtons from './SocialButtons';

export default class InfoBlock extends Component {
  view() {
    const titleContent = app.forum.attribute('modern-footer.title-1')?.trim();
    const rightText = app.forum.attribute('modern-footer.right-text');

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
          <SocialButtons />
        </div>
      </div>
    );
  }
}
