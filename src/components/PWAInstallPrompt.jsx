import React, { useEffect, useState } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 68- beforeinstallprompt default
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // hide UI regardless of outcome
    setVisible(false);
    setDeferredPrompt(null);
    console.log('PWA install outcome:', outcome);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={handleInstallClick} className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg">
        Install App
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
