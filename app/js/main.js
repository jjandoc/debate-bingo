/* eslint-env browser */
import $ from 'jquery';
import BingoCard from 'components/bingo-card';

(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  const terms = ['IPhone', 'helvetica', 'williamsburg', 'kinfolk', 'whatever',
      'butcher', 'photo', 'booth', 'Af', 'biodiesel', 'next', 'level',
      'quinoa', 'tote', 'bag', 'vegan', 'ethical', 'ugh', 'pork', 'belly',
      'prism', 'Normcore', 'single-origin', 'coffee', 'hammock', 'small',
      'batch', 'neutra', 'cronut', 'Retro', 'raw', 'denim', 'austin',
      'readymade', 'vice', 'fixie', 'pug', 'schlitz', 'jean', 'shorts',
      'iceland', 'paleo', 'drinking', 'vinegar', 'hashtag', 'coloring', 'book',
      'Authentic', 'chambray', 'bespoke', 'jianbing', 'put', 'a', 'bird', 'on',
      'it', 'chicharrones', 'iPhone', 'street', 'art', 'meditation',
      'sustainable', 'af', 'banh', 'mi', 'cliche', 'banjo', 'Meditation',
      'blue', 'bottle', 'viral', 'schlitz', 'distillery', 'raw', 'denim',
      'locavore', 'chicharrones', 'fingerstache', 'Roof', 'party', 'celiac',
      'try-hard', 'lyft', '8-bit', 'poke', 'pug', 'man', 'bun', 'hammock',
      'offal', 'tbh', 'trust', 'fund', 'single-origin', 'coffee', 'small',
      'batch'];

  $('.card').each(function() {
    const card = new BingoCard($(this).find('.card-body')[0], terms);
    $(this).on('click', '.card-reset', () => {
      card.reset();
    }).on('click', '.card-refresh', () => {
      card.refresh();
    }).on(BingoCard.Event.BINGO, () => {
      alert('bingo!');
    });
  });
})();
