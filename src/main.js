// Datafeed implementation
import Datafeed from './datafeed.js';

window.tvWidget = new TradingView.widget({
	symbol: 'Bitfinex:BTC/USD',             // Default symbol
	interval: '15',                        // Default interval (15 minutes for better real-time visibility)
	fullscreen: true,                       // Displays the chart in the fullscreen mode
	container: 'tv_chart_container',        // Reference to an attribute of the DOM element
	datafeed: Datafeed,
	library_path: 'charting_library_cloned_data/charting_library/',
	debug: true,                           // Enable debug mode
	realtime: true,                        // Enable real-time updates
	time_frames: [
		{ text: "1m", resolution: "1", description: "1 Minute" },
		{ text: "15m", resolution: "15", description: "15 Minutes" },
		{ text: "1h", resolution: "240", description: "1 Hour" },
		{ text: "1d", resolution: "1D", description: "1 Day" },
	],
	// Additional settings for better real-time performance
	loading_screen: { backgroundColor: "#131722" },
	disabled_features: ["use_localstorage_for_settings"],
	enabled_features: ["study_templates"],
	charts_storage_url: null,
	client_id: "tradingview.com",
	user_id: "public_user_id",

});
