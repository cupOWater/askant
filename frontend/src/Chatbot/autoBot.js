import React, { useEffect } from 'react';

const AutoBot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with AskAnt",
        botConversationDescription: "All About Ants",
        botId: "2047fd74-3e58-4c67-92a3-458b680e509e",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "2047fd74-3e58-4c67-92a3-458b680e509e",
        webhookId: "b94314f7-ad2c-40a5-88b9-ffb8571a0ee5",
        lazySocket: true,
        themeName: "prism",
        botName: "AskAnt",
        frontendVersion: "v1",
        useSessionStorage: true,
        showPoweredBy: true,
        theme: "prism",
        themeColor: "#B00C0C"
      });
    };
  }, []);

  const handleButtonClick = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendPayload({ type: 'text', text: '🎄 Merry Christmas, Chatbot Users! ✨' });
    }
  };

  return (
    <div>
      <h1 onClick={handleButtonClick}>Click me!</h1>
      <button id="sayButton" onClick={handleButtonClick}>
        Send message to chatbot
      </button>
    </div>
  );
};

export default AutoBot;