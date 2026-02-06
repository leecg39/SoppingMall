export const trackEvent = (eventName: string, properties?: any) => {
    // Mock tracking to console
    console.log(`[TRACKING]: ${eventName}`, properties);

    // In a real app, you would send this to Google Analytics, Mixpanel, etc.
    // window.gtag?.('event', eventName, properties);
};
