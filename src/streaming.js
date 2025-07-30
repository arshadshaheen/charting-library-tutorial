import { parseFullSymbol } from './helpers.js';
import { config } from './config.js';

// Using the documentation approach
const ccStreamer = new WebSocket(`${config.webSocketUrl}?api_key=${config.apiKey}`);

// Add connection status tracking
let isConnected = false;
const channelToSubscription = new Map();



ccStreamer.onopen = function onStreamOpen() {
    console.log('[socket] Connected to CryptoCompare WebSocket');
    isConnected = true;
};

ccStreamer.onclose = function onStreamClose(event) {
    console.log('[socket] Disconnected:', event.code, event.reason);
    isConnected = false;
};

ccStreamer.onerror = function onStreamError(error) {
    console.log('[socket] Error:', error);
    isConnected = false;
};

ccStreamer.onmessage = function onStreamMessage(event) {
    const message = event.data;
    console.log('[socket] Message:', message);
    
    try {
        const data = JSON.parse(message);
        
        // Check if this is a subscription confirmation
        if (data.action === 'SubAdd' && data.subs) {
            console.log('[socket] Subscription confirmed for:', data.subs);
            return;
        }
        
        // Check if this is a trade event (TYPE = 0)
        if (!data.TYPE || parseInt(data.TYPE) !== 0) {
            console.log('[socket] Skipping non-trade event:', data);
            return;
        }
        
        // Extract trade data
        const {
            M: exchange,
            FSYM: fromSymbol,
            TSYM: toSymbol,
            TS: tradeTimeStr,
            P: tradePriceStr,
        } = data;
        
        // Validate required fields
        if (!exchange || !fromSymbol || !toSymbol || !tradeTimeStr || !tradePriceStr) {
            console.log('[socket] Missing required fields in trade data:', data);
            return;
        }
        
        const tradePrice = parseFloat(tradePriceStr);
        const tradeTime = parseInt(tradeTimeStr);
        
        if (isNaN(tradePrice) || isNaN(tradeTime)) {
            console.log('[socket] Invalid price or time data:', { tradePriceStr, tradeTimeStr });
            return;
        }
        
        const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
        const subscriptionItem = channelToSubscription.get(channelString);
        
        if (subscriptionItem === undefined) {
            console.log('[socket] No subscription found for channel:', channelString);
            return;
        }
        
        const lastBar = subscriptionItem.lastDailyBar;
        
        if (!lastBar) {
            console.log('[socket] No lastBar available for channel:', channelString);
            return;
        }
        
        // Update the current candle with new trade data
        const updatedBar = {
            ...lastBar,
            high: Math.max(lastBar.high, tradePrice),
            low: Math.min(lastBar.low, tradePrice),
            close: tradePrice,
        };
        
        // Update the stored bar
        subscriptionItem.lastDailyBar = updatedBar;
        

        
        console.log('[socket] Updated candle for', channelString, 'price:', tradePrice, 'resolution:', subscriptionItem.resolution);
        
        // Send updated bar to all subscribers
        subscriptionItem.handlers.forEach((handler) => {
            console.log('[socket] Calling handler callback with updated bar:', updatedBar);
            try {
                handler.callback(updatedBar);
                console.log('[socket] Successfully called handler callback');
            } catch (error) {
                console.error('[socket] Error in handler callback:', error);
            }
        });
        

        
    } catch (error) {
        console.log('[socket] Error parsing message:', error);
    }
};

function getNextDailyBarTime(barTime) {
    const date = new Date(barTime * 1000);
    date.setDate(date.getDate() + 1);
    return date.getTime() / 1000;
}

export function subscribeOnStream(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback,
    lastDailyBar
) {
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    if (!parsedSymbol) {
        console.error('[subscribeBars]: Cannot parse symbol:', symbolInfo.full_name);
        return;
    }
    const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
    const handler = {
        id: subscriberUID,
        callback: onRealtimeCallback,
    };
    let subscriptionItem = channelToSubscription.get(channelString);
    if (subscriptionItem) {
        // Already subscribed to the channel, use the existing subscription
        subscriptionItem.handlers.push(handler);
        console.log('[subscribeBars]: Added handler to existing subscription for channel:', channelString);
        return;
    }
    subscriptionItem = {
        subscriberUID,
        resolution,
        lastDailyBar,
        handlers: [handler],
    };
    channelToSubscription.set(channelString, subscriptionItem);
    console.log(
        '[subscribeBars]: Subscribe to streaming. Channel:',
        channelString,
        'lastDailyBar:',
        lastDailyBar
    );
    const subRequest = {
        action: 'SubAdd',
        subs: [channelString],
    };
    console.log('[subscribeBars]: Sending subscription request:', subRequest);
    if (isConnected) {
        ccStreamer.send(JSON.stringify(subRequest));
    } else {
        console.error('[subscribeBars]: WebSocket not connected, cannot subscribe');
    }
}

export function unsubscribeFromStream(subscriberUID) {
    // Find a subscription with id === subscriberUID
    for (const channelString of channelToSubscription.keys()) {
        const subscriptionItem = channelToSubscription.get(channelString);
        const handlerIndex = subscriptionItem.handlers.findIndex(
            (handler) => handler.id === subscriberUID
        );

        if (handlerIndex !== -1) {
            // Remove from handlers
            subscriptionItem.handlers.splice(handlerIndex, 1);

            if (subscriptionItem.handlers.length === 0) {
                // Unsubscribe from the channel if it was the last handler
                console.log(
                    '[unsubscribeBars]: Unsubscribe from streaming. Channel:',
                    channelString
                );
                const subRequest = {
                    action: 'SubRemove',
                    subs: [channelString],
                };
                if (isConnected) {
                    ccStreamer.send(JSON.stringify(subRequest));
                } else {
                    console.error('[unsubscribeBars]: WebSocket not connected, cannot unsubscribe');
                }
                channelToSubscription.delete(channelString);
                break;
            }
        }
    }
}