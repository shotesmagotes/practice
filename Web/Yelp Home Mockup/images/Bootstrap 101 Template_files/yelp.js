var win = window,
    docEl = document.documentElement,
    $logo = document.getElementById('background-nav');

win.onscroll = function(){
    var sTop = (this.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
    $logo.style.opacity = sTop > 20 ? "0.4":"0";
};

