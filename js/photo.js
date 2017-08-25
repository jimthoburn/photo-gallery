(function() {

  document.addEventListener('keydown', function(e) {

    // If a modifier key was pressed, let the browser handle it.
    if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

    switch(e.which || e.keyCode) {
        case 37: // left
          var previous = document.querySelector('.previous a');
          if (previous) previous.click();
          break;

        case 39: // right
          var next = document.querySelector('.next a');
          if (next) next.click();
        break;

        default: return; // exit this handler for other keys
    }

  })

})();
