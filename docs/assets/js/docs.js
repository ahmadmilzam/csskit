/*!
 * csskit-framework
 * CSSKit SASS Based, BEM, OOCSS Framework
 * https://github.com/ahmadmilzam/csskit
 * @author Ahmad Milzam <email@ahmadmilzam.com>
 * @version 0.0.1
 * Copyright . MIT licensed.
 * 2015-03-04
 */
(function($){

  var root = document.body,
      topbar = document.querySelector('.js-ui-topbar'),
      topbarToggle = document.querySelector('.js-ui-topbar-toggle');

  var handlerTopbar = function (event) {
    event.preventDefault();
    classie.toggle( topbar, 'is-open' ); // toggle class
  }

  if(topbar && topbarToggle){
    topbarToggle.addEventListener('click', handlerTopbar, false);
  }

})();