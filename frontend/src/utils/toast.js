/**
 * Ultra-Modern 2026 Toast & Notification Dispatcher for Kisan Mitra
 */

export const showToast = (message, type = 'info', options = {}) => {
  window.dispatchEvent(
    new CustomEvent('km:show-toast', {
      detail: {
        id: options.id || Date.now() + Math.random(),
        message: typeof message === 'string' ? message : message.message || '',
        title: options.title || (typeof message === 'object' ? message.title : ''),
        type: type || 'info', // 'success' | 'info' | 'audio' | 'voice' | 'warning' | 'error'
        duration: options.duration !== undefined ? options.duration : 4500,
        audioWave: options.audioWave || type === 'audio',
        voiceWave: options.voiceWave || type === 'voice',
        actionLabel: options.actionLabel,
        onAction: options.onAction
      }
    })
  );
};

export const showSuccessToast = (message, title = 'Success', options = {}) => {
  showToast(message, 'success', { title, ...options });
};

export const showErrorToast = (message, title = 'Attention Required', options = {}) => {
  showToast(message, 'error', { title, ...options });
};

export const showWarningToast = (message, title = 'Notice', options = {}) => {
  showToast(message, 'warning', { title, ...options });
};

export const showInfoToast = (message, title = 'Information', options = {}) => {
  showToast(message, 'info', { title, ...options });
};

export const showAudioToast = (transcript, title = 'Mitra Audio Advisory', options = {}) => {
  showToast(transcript, 'audio', {
    title,
    duration: 6000,
    audioWave: true,
    ...options
  });
};

export const showVoiceToast = (prompt = 'Listening for voice input in regional dialect...', title = 'Mitra Voice Assistant', options = {}) => {
  showToast(prompt, 'voice', {
    title,
    duration: 5000,
    voiceWave: true,
    ...options
  });
};
