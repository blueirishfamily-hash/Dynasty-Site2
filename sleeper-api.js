// sleeper-api.js
// Sleeper API Service for Dynasty Fantasy Football Platform

const SLEEPER_BASE_URL = 'https://api.sleeper.app/v1';
const LEAGUE_ID = '1194798912048705536';

class SleeperAPI {
    constructor() {
        this.leagueId = LEAGUE_ID;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Generic fetch with caching
    async fetchWithCache(url, cacheKey = null) {
        const key = cacheKey || url;
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.cache.set(key, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        }
    }

    // League Information
    async getLeague() {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/league/${this.leagueId}`);
    }

    // League Users/Teams
    async getUsers() {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/league/${this.leagueId}/users`);
    }

    // Rosters
    async getRosters() {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/league/${this.leagueId}/rosters`);
    }

    // Matchups for a specific week
    async getMatchups(week) {
        return this.fetchWithCache(
            `${SLEEPER_BASE_URL}/league/${this.leagueId}/matchups/${week}`,
            `matchups-${week}`
        );
    }

    // Transactions
    async getTransactions(round = 1) {
        return this.fetchWithCache(
            `${SLEEPER_BASE_URL}/league/${this.leagueId}/transactions/${round}`,
            `transactions-${round}`
        );
    }

    // Traded Picks
    async getTradedPicks() {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/league/${this.leagueId}/traded_picks`);
    }

    // Drafts
    async getDrafts() {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/league/${this.leagueId}/drafts`);
    }

    // Draft Picks
    async getDraftPicks(draftId) {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/draft/${draftId}/picks`);
    }

    // Player Data (NFL Players)
    async getPlayers() {
        return this.fetchWithCache(`${SLEEPER_BASE_URL}/players/nfl`);
    }

    // Specific Player
    async getPlayer(playerId) {
        const players = await this.getPlayers();
        return players[playerId] || null;
    }

    // Get Current Week
    async getCurrentWeek() {
        const league = await this.getLeague();
        return league.settings.leg || league.settings.start_week || 1;
    }

    // Get User's Roster
    async getUserRoster(userId) {
        const rosters = await this.getRosters();
        return rosters.find(r => r.owner_id === userId || r.roster_id === userId);
    }

    // Get Standings
    async getStandings() {
        const [rosters, users] = await Promise.all([
            this.getRosters(),
            this.getUsers()
        ]);

        const userMap = {};
        users.forEach(user => {
            userMap[user.user_id] = user;
        });

        return rosters.map(roster => {
            const user = userMap[roster.owner_id];
            return {
                rosterId: roster.roster_id,
                userId: roster.owner_id,
                teamName: user?.display_name || user?.username || `Team ${roster.roster_id}`,
                wins: roster.settings.wins || 0,
                losses: roster.settings.losses || 0,
                ties: roster.settings.ties || 0,
                pointsFor: (roster.settings.fpts || 0) + (roster.settings.fpts_decimal || 0) / 100,
                pointsAgainst: (roster.settings.fpts_against || 0) + (roster.settings.fpts_against_decimal || 0) / 100,
                record: `${roster.settings.wins || 0}-${roster.settings.losses || 0}${roster.settings.ties ? `-${roster.settings.ties}` : ''}`
            };
        }).sort((a, b) => {
            // Sort by wins, then points for
            if (b.wins !== a.wins) return b.wins - a.wins;
            return b.pointsFor - a.pointsFor;
        });
    }

    // Get Recent Activity
    async getRecentActivity(limit = 10) {
        const transactions = await this.getTransactions(1);
        return transactions.slice(0, limit).reverse();
    }

    // Get Upcoming Matchup
    async getUpcomingMatchup(userId) {
        const league = await this.getLeague();
        const currentWeek = league.settings.leg || league.settings.start_week || 1;
        const matchups = await this.getMatchups(currentWeek);
        const userRoster = await this.getUserRoster(userId);
        
        if (!userRoster) return null;

        const matchup = matchups.find(m => 
            m.roster_id === userRoster.roster_id
        );

        if (!matchup) return null;

        const opponentMatchup = matchups.find(m => 
            m.matchup_id === matchup.matchup_id && 
            m.roster_id !== userRoster.roster_id
        );

        return {
            week: currentWeek,
            userMatchup: matchup,
            opponentMatchup: opponentMatchup
        };
    }
}

// Initialize API instance
const sleeperAPI = new SleeperAPI();

