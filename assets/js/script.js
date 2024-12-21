// $(function() {
//   var onScroll = function() {
//     var y = $(document).scrollTop();
//     $('.hover-menu').css('top', (y<60?90-y:10)+'px');
//   };
//   $('body').scrollspy({target: '.hover-menu'});
//
//   $(document).on('scroll', onScroll);
//   onScroll();
// });

// (function() {
//   var wnd = $(window), menu = $('.hover-menu'), base = $('.site>.container');
//   wnd.on('resize', function() {
//     var pad = 20, left = (base.offset().left-menu.width()-pad)/2;
//     menu.css('left', left+'px');
//     menu.css('display', left<pad? 'none': 'block');
//   });
//   wnd.trigger('resize');
// })();

(function() {
  var togle = function(n) {
    if(n.hasClass('open')) {
      n.removeClass('open');
    }
    else {
      n.addClass('open');
    }
  };
  $('.mmenu>.ml0>li').on('click', function(e) {
    var n = $(e.target);
    while(n[0].nodeName!=='LI') {
      n = $(n[0].parentNode);
    }
    togle(n);
  });
  $('.mmenu>.mtogle').on('click', function(e) {
    togle($('.mmenu'));
  });
})();

$('.show-source').click(function(e) {
  e.preventDefault();
  var sourceWindow = window.open('','Source code','height=800,width=800,scrollbars=1,resizable=1');
  if(window.focus) sourceWindow.focus();
  $.get('pages/'+$(e.target).attr('data')+'.php', function(source) {
    source = source.replace(/(<p>|<pre>)(.|\n|\r)*(<\/p>|<\/pre>)/gm,'');
    source = ['<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Source code</title>\n<link rel="stylesheet" href="css/style.css">\n<script src="https://cdn.3dflipbook.net/js/jquery.min.js"></script>\n</head>\n<body>\n', source, '</body>\n</html>\n'].join('');
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    source = ['<pre><code class="html">',source,'</code></pre>'].join('');
    $(sourceWindow.document.body).html(source);
    $.get('css/highlight.min.css', function(s) {
      $(sourceWindow.document.head).append(['<style type="text/css">',s,'</style>'].join(''));
    });
    $.get('https://cdn.3dflipbook.net/js/highlight.min.js', function(s) {
      $('<script>').text(s+'hljs.initHighlighting();').appendTo(sourceWindow.document.body);
    });
  });
});

$('.modal .cmd-close').click(function(e) {
  e.preventDefault();
  $('.modal').modal('hide');
});

(function() {
  var productsBtn = $('.products-btn');
  productsBtn.click(function(e) {
    e.preventDefault();
    var view = $('.modal'), content = view.find('.modal-content');
    if(!content.html().trim()) {
      content.html('<div class="products-table"><div class="scale"><stripe-pricing-table pricing-table-id="'+productsBtn.attr('data-table-id')+'" publishable-key="'+productsBtn.attr('data-key')+'"></stripe-pricing-table></div></div>');
    }
    view.modal('show');
  });
})();

$('.conversion').on('click', function(e) {
  var node = $(e.target);
  while(!node.hasClass('conversion')) {
    node = $(node[0].parentNode);
  }
  gtag('event', 'page_view', {page_location: '/click/'+node.attr('data-conversion')});
});

// Lightbox Effect

var fb3d = {
  activeModal: undefined,
  capturedElement: undefined
};

(function() {
  function findParent(parent, node) {
    while(parent && parent!=node) {
      parent = parent.parentNode;
    }
    return parent;
  }
  $('body').on('mousedown', function(e) {
    fb3d.capturedElement = e.target;
  });
  $('body').on('click', function(e) {
    if(fb3d.activeModal && fb3d.capturedElement===e.target) {
      if(e.target===fb3d.activeModal[0] || findParent(e.target, fb3d.activeModal.find('.cmd-close')[0])) {
        e.preventDefault();
        fb3d.activeModal.fb3dModal('hide');
      }
    }
    delete fb3d.capturedElement;
  });
})();
$('body').on('keydown', function(e) {
  if(fb3d.activeModal && e.keyCode===27) {
    e.preventDefault();
    fb3d.activeModal.fb3dModal('hide');
  }
});

$.fn.fb3dModal = function(cmd) {
  setTimeout(function() {
    function fb3dModalShow() {
      if(!this.hasClass('visible')) {
        $('body').addClass('fb3d-modal-shadow');
        this.addClass('visible');
        fb3d.activeModal = this;
        this.trigger('fb3d.modal.show');
      }
    }
    function fb3dModalHide() {
      if(this.hasClass('visible')) {
        $('body').removeClass('fb3d-modal-shadow');
        this.removeClass('visible');
        fb3d.activeModal = undefined;
        this.trigger('fb3d.modal.hide');
      }
    }
    var mdls = this.filter('.fb3d-modal');
    switch(cmd) {
      case 'show':
        fb3dModalShow.call(mdls);
      break;
      case 'hide':
        fb3dModalHide.call(mdls);
      break;
    }
  }.bind(this), 50);
};
