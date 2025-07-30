# Real-Time Cryptocurrency Charting Library

A real-time cryptocurrency charting application built with TradingView's Advanced Charts library and CryptoCompare API. This project provides live price updates, multiple timeframes, and interactive charts for cryptocurrency trading pairs.

## 🚀 Features

- **Real-time Price Updates**: Live streaming data from CryptoCompare WebSocket API
- **Multiple Timeframes**: Support for 1m, 15m, 1h, and 1D charts
- **Interactive Charts**: Full TradingView charting library with technical indicators
- **Environment Configuration**: Secure API key management via environment variables
- **Cross-platform**: Works on Windows, macOS, and Linux

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd test-charting-library
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

1. **Copy the environment template:**
   ```bash
   cp env.example .env
   ```

2. **Edit the `.env` file with your configuration:**
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

3. **Get a CryptoCompare API Key:**
   - Visit [CryptoCompare](https://www.cryptocompare.com/cryptopian/api-keys)
   - Sign up for a free account
   - Generate an API key
   - Replace `your_actual_api_key_here` in the `.env` file

### 4. TradingView Library Setup

The project includes the TradingView charting library in the `charting_library_cloned_data/` directory. This is a pre-configured version of the library that works with this project.

## 🚀 Running the Application

### Development Server

For **Windows** (recommended):
```bash
npx serve
```

For **macOS/Linux**:
```bash
npx serve
```

The application will be available at: `http://localhost:3000`

### Alternative Development Servers

If you prefer other development servers:

**Using Python:**
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

**Using PHP:**
```bash
php -S localhost:3000
```

## 📊 Available Pages

### Main Chart Page
- **URL**: `http://localhost:3000`
- **Description**: Main cryptocurrency chart with real-time updates
- **Features**: Full TradingView interface, multiple timeframes, live data

### Test Pages
- **WebSocket Test**: `http://localhost:3000/test-websocket-simple.html`
  - Tests WebSocket connection to CryptoCompare
  - Displays raw data feed
  - Essential for debugging connection issues

- **Real-time Test**: `http://localhost:3000/real-time-test.html`
  - Comprehensive real-time testing interface
  - Manual controls for testing different timeframes
  - Live logging of data updates
  - Essential for debugging real-time functionality

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CRYPTOCOMPARE_API_KEY` | Your CryptoCompare API key | Required |
| `CRYPTOCOMPARE_BASE_URL` | REST API base URL | `https://min-api.cryptocompare.com` |
| `CRYPTOCOMPARE_WEBSOCKET_URL` | WebSocket URL | `wss://streamer.cryptocompare.com/v2` |
| `TRADINGVIEW_CLIENT_ID` | TradingView client ID | `tradingview.com` |
| `TRADINGVIEW_USER_ID` | TradingView user ID | `public_user_id` |
| `DEFAULT_SYMBOL` | Default trading pair | `Bitfinex:BTC/USD` |
| `DEFAULT_INTERVAL` | Default chart timeframe | `15` |

### Supported Trading Pairs

The application supports various cryptocurrency pairs. Examples:
- `Bitfinex:BTC/USD` - Bitcoin to USD on Bitfinex
- `Coinbase:BTC/USD` - Bitcoin to USD on Coinbase
- `Binance:ETH/USDT` - Ethereum to USDT on Binance

### Supported Timeframes

- **1m** - 1 minute candles
- **15m** - 15 minute candles  
- **1h** - 1 hour candles
- **1D** - Daily candles

## 🐛 Troubleshooting

### Common Issues

**1. Chart Not Loading**
- Check browser console for errors
- Verify TradingView library path in `src/main.js`
- Ensure all files are served correctly

**2. No Real-time Updates**
- Verify WebSocket connection in browser console
- Check API key in `.env` file
- Test WebSocket connection at `/test-websocket-simple.html`
- Use real-time test page at `/real-time-test.html` for detailed debugging

**3. Time Violation Errors**
- Clear browser cache
- Restart the development server
- Check for multiple chart instances

**4. 404 Errors**
- Ensure all files are in correct locations
- Check file paths in HTML files
- Verify server is running on correct port

### Debug Steps

1. **Check Console Logs**: Open browser developer tools and check for errors
2. **Test WebSocket**: Visit `/test-websocket-simple.html` to verify connection
3. **Test Real-time**: Visit `/real-time-test.html` for comprehensive debugging
4. **Verify API Key**: Ensure your CryptoCompare API key is valid
5. **Clear Cache**: Clear browser cache and restart server

## 📁 Project Structure

```
test-charting-library/
├── src/
│   ├── main.js              # Main chart initialization
│   ├── datafeed.js          # Datafeed implementation
│   ├── streaming.js         # WebSocket real-time data
│   ├── helpers.js           # Utility functions
│   └── config.js            # Environment configuration
├── charting_library_cloned_data/
│   └── charting_library/    # TradingView library files
├── index.html               # Main chart page
├── real-time-test.html      # Real-time testing page
├── test-websocket-simple.html # WebSocket test page
├── .env                     # Environment variables (create from env.example)
├── env.example              # Environment template
└── README.md               # This file
```

## 🔒 Security Notes

- **Never commit your `.env` file** to version control
- Keep your API keys secure and rotate them regularly
- The `.env` file is already added to `.gitignore`
- Use environment variables for all sensitive configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project contains code from multiple sources with different licenses:

- **TradingView Charting Library**: Subject to TradingView's license terms
- **Application Code**: MIT License - Copyright (c) 2024 Arshad Shaheen

For complete license information, see the [LICENSE](LICENSE) file.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Test individual components using the test pages
4. Verify your API key and configuration

## 🔗 Useful Links

- [TradingView Charting Library Documentation](https://www.tradingview.com/charting-library-docs/)
- [CryptoCompare API Documentation](https://min-api.cryptocompare.com/)
- [CryptoCompare WebSocket API](https://min-api.cryptocompare.com/documentation?key=Streaming&cat=TradeDataStreaming)
- [Environment Configuration Guide](README-ENV.md)
