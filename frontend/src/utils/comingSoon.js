/**
 * Utility helper to trigger the Coming Soon modal from anywhere in the app
 * @param {'app' | 'demo'} type 
 * @param {string} [customTitle]
 * @param {string} [customSubtitle]
 * @param {string} [source]
 */
export const showComingSoon = (type = 'app', customTitle = '', customSubtitle = '', source = '') => {
  window.dispatchEvent(
    new CustomEvent('km:open-coming-soon', {
      detail: { type, customTitle, customSubtitle, source }
    })
  );
};
