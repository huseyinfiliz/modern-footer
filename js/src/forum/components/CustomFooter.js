import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

export default class CustomFooter extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.open = false;

    const js = app.forum.attribute('modern-footer.js');
    if (js) {
      $('body').append(`<script>${js.trim()}</script>`);
    }
  }

  view() {
    return (
 	 <div class="row">
    	<div class="foo-left">
      	<div>
       	 <h3>
				{m.trust(app.forum.attribute('modern-footer.text') || '<strong>example.com</strong>')}
			</h3>
       	 <p>© 2024, All Rights Reserved</p>
       	 <button class="Button Button--primary"><span class="Button-label"><a href="#contact">Report Abusive Content</a></span></button>

      	</div>
 	   </div>
 	   <div class="foo-mid">
  	    <div>
   	     <h3>Legal</h3>
   	     <ul>
    	      <li><a href="#">Example Link</a></li>
    	      <li><a href="#">Example Link</a></li>
     	     <li><a href="#">Example Link</a></li>
       	   <li><a href="#">Example Link</a></li>
   	     </ul>
   	   </div>
  	  </div>
  	  <div class="foo-mid">
  	    <div>
   	     <h3>Links</h3>
   	     <ul>
    	      <li><a href="#" target="_blank">Example Link</a></li>
     	     <li><a href="#" target="_blank">Example Link</a></li>
     	     <li><a href="#" target="_blank">Example Link</a></li>
    	      <li><a href="#" target="_blank">Example Link</a></li>
 	       </ul>
   	   </div>
  	  </div>

  	  <div class="foo-right">
   	   <div>
    	    <h3>Disclaimer</h3>
    	    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in auctor velit. Nam tincidunt venenatis mi non efficitur. Etiam ullamcorper, augue.</p>
   	   </div>
   	 </div>

 	 </div>
    );
  }
}
