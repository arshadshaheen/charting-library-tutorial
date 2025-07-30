// Configuration module for environment variables and API settings
class Config {
    constructor() {
        this.loadEnvironmentVariables();
    }

    loadEnvironmentVariables() {
        // For browser environment, we'll use a simple approach
        // In production, you'd want to use a proper environment variable system
        this.cryptoCompareApiKey = this.getEnvVar('CRYPTOCOMPARE_API_KEY', 'e459128e835fcf1a73fdd58a89bedabf6efcb788838ebc612a613bb5166f8cc1');
        this.cryptoCompareBaseUrl = this.getEnvVar('CRYPTOCOMPARE_BASE_URL', 'https://min-api.cryptocompare.com');
        this.cryptoCompareWebSocketUrl = this.getEnvVar('CRYPTOCOMPARE_WEBSOCKET_URL', 'wss://streamer.cryptocompare.com/v2');
        
        this.tradingViewClientId = this.getEnvVar('TRADINGVIEW_CLIENT_ID', 'tradingview.com');
        this.tradingViewUserId = this.getEnvVar('TRADINGVIEW_USER_ID', 'public_user_id');
        
        this.defaultSymbol = this.getEnvVar('DEFAULT_SYMBOL', 'Bitfinex:BTC/USD');
        this.defaultInterval = this.getEnvVar('DEFAULT_INTERVAL', '15');
    }

    getEnvVar(key, defaultValue = '') {
        // In a browser environment, we can't directly access process.env
        // This is a simple implementation - in production, you'd want to:
        // 1. Use a build tool like webpack with dotenv plugin
        // 2. Or inject environment variables during build time
        // 3. Or use a configuration service
        
        // For now, we'll check if there's a global config object
        if (window.ENV_CONFIG && window.ENV_CONFIG[key]) {
            return window.ENV_CONFIG[key];
        }
        
        // Fallback to default value
        return defaultValue;
    }

    // Getters for easy access
    get apiKey() {
        return this.cryptoCompareApiKey;
    }

    get baseUrl() {
        return this.cryptoCompareBaseUrl;
    }

    get webSocketUrl() {
        return this.cryptoCompareWebSocketUrl;
    }

    get clientId() {
        return this.tradingViewClientId;
    }

    get userId() {
        return this.tradingViewUserId;
    }

    get symbol() {
        return this.defaultSymbol;
    }

    get interval() {
        return this.defaultInterval;
    }
}

// Create and export a singleton instance
export const config = new Config(); 