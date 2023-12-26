function scrollToElement(elementId) {
    var container = document.querySelector('.container-2');
    var targetElement = document.getElementById(elementId);
  
    if (targetElement) {
      var duration = 500; // Set the duration of the scroll animation (in milliseconds)
      var start = container.scrollTop;
      var end = targetElement.offsetTop;
      var startTime = performance.now();
  
      // If the target element is the first child, set the end position to 0
      if (targetElement === container.firstChild) {
        end = 0;
      }
  
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      function scroll() {
        var currentTime = performance.now();
        var timeElapsed = currentTime - startTime;
  
        container.scrollTop = easeInOutQuad(timeElapsed, start, end - start, duration);
  
        if (timeElapsed < duration) {
          requestAnimationFrame(scroll);
        }
      }
  
      requestAnimationFrame(scroll);
    }
  }

function scrollToY(positionY) {
  var container = document.querySelector('.container-2');

  // Scroll to the specified Y position with a smooth effect
  container.scrollTo({
    top: positionY,
    behavior: 'smooth'
  });

  // Highlight the current section (optional)
  removeCurrentSectionHighlight();
  updateCurrentSectionHighlight(positionY);
}

function removeCurrentSectionHighlight() {
  // Remove the 'current-section' class from all sections
  var sections = document.querySelectorAll('.container-2 > div');
  sections.forEach(function(section) {
    section.classList.remove('current-section');
  });
}

function updateCurrentSectionHighlight(positionY) {
  // Find the section corresponding to the current Y position
  var sections = document.querySelectorAll('.container-2 > div');
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionTop = section.offsetTop;
    var sectionBottom = sectionTop + section.clientHeight;

    // Highlight the section if its Y position is within the viewport
    if (positionY >= sectionTop && positionY < sectionBottom) {
      section.classList.add('current-section');
      break;
    }
  }
}
