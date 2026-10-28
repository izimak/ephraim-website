/**
 * EphrAIm Solutions - Site tracking
 * Meta Pixel, Google Analytics (GA4) and lead-source capture.
 * Loaded in the <head> of every page.
 */

(function() {

  // ============================================
  // CONFIG
  // ============================================

  var META_PIXEL_ID = '2774567706260773';
  var GA4_ID = ''; // e.g. 'G-XXXXXXXXXX' - leave empty until the GA4 property exists

  // ============================================
  // META PIXEL
  // ============================================

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');

  // ============================================
  // GOOGLE ANALYTICS (GA4)
  // ============================================

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };

  if (GA4_ID) {
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(ga);
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  // ============================================
  // CONTENT VIEWS - industry and case-study pages
  // ============================================

  var path = window.location.pathname;
  var section = path.split('/')[1] || 'home';

  if (section === 'industries' || section === 'case-studies' || section === 'ai-solutions') {
    var pageName = path.split('/').filter(Boolean).join('/');
    fbq('track', 'ViewContent', { content_name: pageName, content_category: section });
  }

  // ============================================
  // LEAD SOURCE CAPTURE
  // First touch is kept; last touch is updated on every tagged visit.
  // ============================================

  var SOURCE_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

  function readStore(key) {
    try { return JSON.parse(window.localStorage.getItem(key)) || null; } catch (e) { return null; }
  }

  function writeStore(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  var params = new URLSearchParams(window.location.search);
  var touch = {};
  var tagged = false;

  SOURCE_KEYS.forEach(function(key) {
    var value = params.get(key);
    if (value) {
      touch[key] = value;
      tagged = true;
    }
  });

  var externalReferrer = document.referrer && document.referrer.indexOf(window.location.hostname) === -1;

  if (tagged || externalReferrer || !readStore('eph_first_touch')) {
    touch.landing_page = path;
    touch.referrer = document.referrer || '';
    touch.date = new Date().toISOString();

    if (!readStore('eph_first_touch')) {
      writeStore('eph_first_touch', touch);
    }
    if (tagged || externalReferrer) {
      writeStore('eph_last_touch', touch);
    }
  }

  function readCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : '';
  }

  // Lead source fields for the contact form payload
  window.ephLeadSource = function() {
    var first = readStore('eph_first_touch') || {};
    var last = readStore('eph_last_touch') || first;
    return {
      utm_source: last.utm_source || '',
      utm_medium: last.utm_medium || '',
      utm_campaign: last.utm_campaign || '',
      utm_content: last.utm_content || '',
      utm_term: last.utm_term || '',
      fbclid: last.fbclid || '',
      gclid: last.gclid || '',
      landing_page: last.landing_page || '',
      referrer: last.referrer || '',
      first_utm_source: first.utm_source || '',
      first_utm_campaign: first.utm_campaign || '',
      first_landing_page: first.landing_page || '',
      fbp: readCookie('_fbp'),
      fbc: readCookie('_fbc'),
      page: path
    };
  };

  // Fired by the contact form after a successful submit
  window.ephTrackLead = function(eventId) {
    fbq('track', 'Lead', {}, { eventID: eventId });
    if (GA4_ID) {
      gtag('event', 'generate_lead', { event_id: eventId });
    }
  };

})();
