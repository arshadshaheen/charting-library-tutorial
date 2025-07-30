# Environment Configuration

This project now uses environment variables for configuration instead of hardcoded values. This improves security and makes the application more configurable.

## Setup

1. **Copy the example environment file:**
   ```bash
   cp env.example .env
   ```

2. **Edit the `.env` file with your actual values:**
   ```env
   # CryptoCompare API Configuration
   CRYPTOCOMPARE_API_KEY=your_actual_api_key_here
   CRYPTOCOMPARE_BASE_URL=https://min-api.cryptocompare.com
   CRYPTOCOMPARE_WEBSOCKET_URL=wss://streamer.cryptocompare.com/v2

   # TradingView Configuration
   TRADINGVIEW_CLIENT_ID=tradingview.com
   TRADINGVIEW_USER_ID=public_user_id

   # Chart Configuration
   DEFAULT_SYMBOL=Bitfinex:BTC/USD
   DEFAULT_INTERVAL=15
   ```

## Configuration Options

### CryptoCompare API
- `CRYPTOCOMPARE_API_KEY`: Your CryptoCompare API key (required)
- `CRYPTOCOMPARE_BASE_URL`: Base URL for REST API calls
- `CRYPTOCOMPARE_WEBSOCKET_URL`: WebSocket URL for real-time data

### TradingView
- `TRADINGVIEW_CLIENT_ID`: Client ID for TradingView
- `TRADINGVIEW_USER_ID`: User ID for TradingView

### Chart Settings
- `DEFAULT_SYMBOL`: Default trading pair to display
- `DEFAULT_INTERVAL`: Default chart timeframe (in minutes)

## Security Notes

- **Never commit your `.env` file** to version control
- Add `.env` to your `.gitignore` file
- Keep your API keys secure and rotate them regularly
- The `env.example` file shows the structure without real values

## How It Works

The application uses a `Config` class in `src/config.js` that:
1. Loads environment variables
2. Provides fallback default values
3. Exposes configuration through getter methods
4. Works in both development and production environments

## Production Deployment

For production deployment, you should:
1. Set environment variables on your hosting platform
2. Use a proper environment variable system
3. Consider using a configuration service for sensitive data
4. Implement proper API key rotation

## Current Implementation

The current implementation uses a simple approach suitable for development:
- Falls back to default values if environment variables aren't set
- Works in browser environments
- Provides a foundation for more sophisticated configuration management 