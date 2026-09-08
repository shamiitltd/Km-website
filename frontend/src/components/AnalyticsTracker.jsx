import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility to get or create a persistent anonymous visitor ID
 */
function getOrCreateVisitorId() {
  try {
    let id = localStorage.getItem('km_visitor_id');
    if (!id) {
      id = 'v_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem('km_visitor_id', id);
    }
    return id;
  } catch {
    return 'v_' + Math.random().toString(36).slice(2, 11);
  }
}

/**
 * Utility to get or create a session ID for the current browser session
 */
function getOrCreateSessionId() {
  try {
    let id = sessionStorage.getItem('km_session_id');
    if (!id) {
      id = 's_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36);
      sessionStorage.setItem('km_session_id', id);
    }
    return id;
  } catch {
    return 's_' + Math.random().toString(36).slice(2, 11);
  }
}

/**
 * Detect client platform characteristics
 */
function getDeviceInfo() {
  const ua = navigator.userAgent || '';
  const width = window.innerWidth || 1024;

  let deviceType = 'desktop';
  if (/iPad|Tablet|(android(?!.*mobile))/i.test(ua) || (width >= 768 && width <= 1024)) {
    deviceType = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua) || width < 768) {
    deviceType = 'mobile';
  }

  let browser = 'Other';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';

  let os = 'Other';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return { deviceType, browser, os };
}

export default function AnalyticsTracker() {
  const location = useLocation();
  const lastPathRef = useRef(null);
  const heartbeatTimerRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const currentPath = location.pathname;

    // Do not track administrative actions to keep metrics clean and authentic
    if (currentPath.startsWith('/admin')) {
      return;
    }

    lastPathRef.current = currentPath;
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const { deviceType, browser, os } = getDeviceInfo();

    // 1. Send page view track
    fetch(`${apiUrl}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId,
        path: currentPath,
        title: document.title,
        referrer: document.referrer || 'Direct',
        deviceType,
        browser,
        os
      })
    }).catch(() => {});

    // 2. Setup or reset Heartbeat interval (every 20 seconds)
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
    }

    const sendHeartbeat = () => {
      // Only ping if the tab is actively visible to save power and accurately reflect engagement
      if (document.visibilityState === 'visible') {
        fetch(`${apiUrl}/analytics/heartbeat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            visitorId,
            currentPath: lastPathRef.current || '/',
            deviceType
          })
        }).catch(() => {});
      }
    };

    heartbeatTimerRef.current = setInterval(sendHeartbeat, 20000);

    return () => {
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
      }
    };
  }, [location.pathname, location.search, apiUrl]);

  // Handle page unload / tab closure for immediate active count decrement
  useEffect(() => {
    const handleLeave = () => {
      const sessionId = sessionStorage.getItem('km_session_id');
      if (sessionId) {
        const payload = JSON.stringify({ sessionId });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(`${apiUrl}/analytics/leave`, new Blob([payload], { type: 'application/json' }));
        } else {
          fetch(`${apiUrl}/analytics/leave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true
          }).catch(() => {});
        }
      }
    };

    window.addEventListener('pagehide', handleLeave);
    window.addEventListener('beforeunload', handleLeave);

    return () => {
      window.removeEventListener('pagehide', handleLeave);
      window.removeEventListener('beforeunload', handleLeave);
    };
  }, [apiUrl]);

  return null; // Invisible component
}
