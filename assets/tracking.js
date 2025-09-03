function track(eventName, params = {}) {
  const eventData = {
    page: window.location.href.split('#')[0],
    ...params
  }  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...eventData });
}