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