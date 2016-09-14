/* eslint-env browser */
import jQuery from 'jquery';
import _ from 'underscore';
import BingoCard from 'components/bingo-card';
import clintonTerms from 'terms/clinton';
import trumpTerms from 'terms/trump';

window.jQuery = jQuery;
require('vendor/tipr');

(function(window, $) {
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
  const app = {
    cards: []
  };

  $('.card').each(function() {
    const terms = $(this).hasClass('dems') ? clintonTerms : trumpTerms;
    const card = new BingoCard($(this).find('.card-body')[0], terms);
    $(this).on('click', '.card-reset', e => {
      $(e.currentTarget).attr('disabled', 'disabled');
      card.reset();
      $(this).removeClass('bingoed');
    }).on('click', '.card-refresh', () => {
      card.refresh();
      $(this).removeClass('bingoed');
    }).on(BingoCard.Event.BINGO, () => {
      $(this).addClass('bingoed');
    }).on('squareSelected', () => {
      if ($(this).find('.bingo-square.selected').length > 0) {
        $(this).find('.card-reset').removeAttr('disabled');
      } else {
        $(this).find('.card-reset').attr('disabled', 'disabled');
      }
    });
    app.cards.push(card);
  });

  $(document).on('click', '.refresh-all', e => {
    e.preventDefault();
    _.each(app.cards, card => {
      card.refresh();
    });
  }).on('click', '.print', e => {
    e.preventDefault();
    window.print();
  });

  $('.tip').tipr();
})(window, jQuery);
