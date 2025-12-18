# Dynasty Fantasy Football Platform

A modern, data-driven Dynasty Fantasy Football League Management Platform built with Sleeper API integration.

## 🏈 Features

- **League Dashboard**: Real-time activity feed, standings, and matchup previews
- **Roster Management**: Comprehensive roster view with player stats, filtering, and detailed player cards
- **Trade Center**: Interactive trade proposal interface with trade analyzer
- **Draft Board**: Current and historical draft views with pick tracking

## 🔌 Sleeper API Integration

This platform is configured to connect to Sleeper League ID: `1194798912048705536`

All data is fetched directly from the Sleeper API, including:
- League information and settings
- User rosters and players
- Matchups and scoring
- Transactions and trade history
- Draft picks and traded picks
- Player data and statistics

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Access to the Sleeper API (public endpoints, no authentication required for read operations)

### Deployment

This repository is configured for automatic deployment to GitHub Pages. Simply push to the `main` branch and the site will automatically deploy.

**Live Site:** https://blueirishfamily-hash.github.io/Dynasty-Site2/

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blueirishfamily-hash/Dynasty-Site2.git
cd Dynasty-Site2
```

2. Open `index.html` in your web browser, or use a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### File Structure

- `index.html` - Main landing page with navigation
- `sleeper-api.js` - Sleeper API service and data fetching
- `dashboard.html` - League dashboard and overview
- `roster.html` - Roster management interface
- `trade.html` - Trade center and negotiation
- `draft.html` - Draft board and pick management

## 📋 API Endpoints Used

The platform uses the following Sleeper API endpoints:

- `GET /league/{league_id}` - League information
- `GET /league/{league_id}/users` - League users/teams
- `GET /league/{league_id}/rosters` - Team rosters
- `GET /league/{league_id}/matchups/{week}` - Weekly matchups
- `GET /league/{league_id}/transactions/{round}` - Transactions
- `GET /league/{league_id}/traded_picks` - Traded draft picks
- `GET /league/{league_id}/drafts` - Draft information
- `GET /draft/{draft_id}/picks` - Draft picks
- `GET /players/nfl` - NFL player data

## 🎨 Design Features

- **Dark Theme**: Eye-friendly dark mode interface
- **Responsive Design**: Works on desktop and mobile devices
- **Data Visualization**: Charts and graphs for trends
- **Dynasty-Specific Metrics**: Age, position rank, and draft capital tracking
- **Real-Time Updates**: Live data from Sleeper API

## 🔧 Configuration

### Setting Your User ID

By default, the platform uses the first user in the league. To set your specific user ID, edit the following in each HTML file:

```javascript
currentUserId = users[0]?.user_id; // Change to your Sleeper user ID
```

Or add user selection functionality to allow switching between users.

### CORS Considerations

The Sleeper API may have CORS restrictions when accessed directly from a browser. For production use, consider:

1. Using a proxy server
2. Running a backend API that fetches Sleeper data
3. Using a browser extension to bypass CORS (development only)

## 📱 Mobile Support

All pages are responsive and optimized for mobile devices. The Roster Management page includes a mobile-specific card layout.

## 🛠️ Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Sleeper API

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For issues or questions, please open an issue on the GitHub repository.

## 🙏 Acknowledgments

- Sleeper API for providing comprehensive fantasy football data
- Inter and Poppins fonts from Google Fonts

