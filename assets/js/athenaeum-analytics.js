/* Basic consent mode: no Google request is made before a visitor opts in. */
(() => {
  const config = document.querySelector('script[data-athenaeum-analytics]');
  const notice = document.querySelector('.analytics-notice');
  if (!config || !notice) return;
  const id = config.dataset.measurementId;
  const storageKey = 'athenaeum.analytics-consent.v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  const production = config.dataset.production === 'true' && location.origin === config.dataset.siteOrigin && location.protocol === 'https:';
  const contextNode = document.getElementById('analytics-page-context');
  const context = contextNode ? JSON.parse(contextNode.textContent) : {};
  const status = document.querySelector('[data-analytics-choice-status]');
  let choice = '';
  let active = false;
  let started = false;
  let returnFocus = null;

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && Date.now() - saved.time < lifetime && ['granted', 'denied'].includes(saved.value)) choice = saved.value;
  } catch (_) { /* Storage may be unavailable; keep the choice for this visit. */ }

  function safeLocation() {
    const url = new URL(location.href);
    const allowed = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']);
    for (const key of Array.from(url.searchParams.keys())) if (!allowed.has(key)) url.searchParams.delete(key);
    url.hash = '';
    return url.href;
  }

  function event(name, parameters = {}) {
    if (active && choice === 'granted' && !privacySignal) window.gtag('event', name, parameters);
  }

  function start() {
    if (!production || privacySignal || choice !== 'granted') return;
    active = true;
    window['ga-disable-' + id] = false;
    if (started) {
      window.gtag('consent', 'update', {analytics_storage: 'granted'});
      return;
    }
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('consent', 'update', {analytics_storage: 'granted'});
    let referrer = '';
    try { if (document.referrer) referrer = new URL(document.referrer).origin + '/'; } catch (_) {}
    window.gtag('config', id, {
      page_location: safeLocation(), page_referrer: referrer,
      content_group: context.content_group || 'Information',
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_domain: location.hostname, cookie_expires: lifetime / 1000,
      cookie_flags: 'SameSite=Lax;Secure'
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(tag);
  }

  function stop() {
    active = false;
    window['ga-disable-' + id] = true;
    if (started) window.gtag('consent', 'update', {analytics_storage: 'denied'});
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; Domain=' + location.hostname, '; Domain=.' + location.hostname]) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure' + domain;
      }
    }
  }

  function openSettings(trigger) {
    returnFocus = trigger || null;
    status.textContent = privacySignal ? '브라우저의 추적 거부 설정을 따릅니다.' : choice ? '현재 설정: ' + (choice === 'granted' ? '통계 허용' : '허용 안 함') : '';
    notice.hidden = false;
    if (trigger) notice.querySelector('button').focus();
  }

  for (const trigger of document.querySelectorAll('[data-open-analytics-settings]')) {
    trigger.hidden = false;
    trigger.addEventListener('click', () => openSettings(trigger));
  }
  for (const button of notice.querySelectorAll('[data-analytics-choice]')) {
    button.addEventListener('click', () => {
      choice = button.dataset.analyticsChoice;
      try { localStorage.setItem(storageKey, JSON.stringify({value: choice, time: Date.now()})); } catch (_) {}
      if (choice === 'granted') start(); else stop();
      notice.hidden = true;
      if (returnFocus) returnFocus.focus();
    });
  }

  document.addEventListener('click', e => {
    const target = e.target.closest && e.target.closest('[data-filter], .blogs-card-link');
    if (!target) return;
    if (target.matches('[data-filter]')) {
      event('select_content', {content_type: 'blog_subject', item_id: target.dataset.filter});
    } else {
      event('select_content', {content_type: 'blog_post', item_id: new URL(target.href).pathname});
    }
  });

  if (context.is_article) {
    const article = document.querySelector('main > .prose[data-pagefind-body]');
    const sent = new Set();
    let queued = false;
    function progress() {
      queued = false;
      if (!active || !article || document.visibilityState !== 'visible') return;
      const rect = article.getBoundingClientRect();
      const percent = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / rect.height * 100));
      for (const threshold of [25, 50, 75, 90]) {
        if (percent >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          event('article_read_' + threshold, {percent_scrolled: threshold});
        }
      }
    }
    window.addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(progress); }
    }, {passive: true});
  }

  if (choice === 'granted') start();
  else if (!choice && !privacySignal) openSettings();
})();
