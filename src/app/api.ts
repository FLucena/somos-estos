import type { Match, Player } from "./types"

const api = {
    match: {
        list: async (): Promise<Match[]> => {
            return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQsCcWfdtlmIk-pLAcElJyCFwz6W7U_GOISzuLfdR8VyJudQzjn4jk6JsgkJX4gjAr-BnQNIQar-deS/pub?output=tsv')
            .then((res) => res.text())
            .then(text => {
                return text
                    .split('\n')
                    .slice(1)
                    .map(row => {
                        const [date, team1, team2, goals1, goals2] = row.split('\t')
                        return {
                            date,
                            team1,
                            team2,
                            goals1: parseInt(goals1),
                            goals2: parseInt(goals2),
                        }
                    })
            })
        }
    },
    player: {
        list: async (): Promise<Player[]> => {
            const matches = await api.match.list();
            const players = new Map<string, Player>();

            for (const {team1, team2, goals1, goals2} of matches) {
                const players1 = team1.split(",");
                const players2 = team2.split(",");
                for  (let name of players1) {
                    name = name.trim();
                    const player = players.get(name) || {
                        name,
                        matches: 0,
                        score: 0,
                    };
                    player.matches++;
                    player.score += goals1 - goals2;
                    players.set(name, player);
                }
                for  (let name of players2) {
                    name = name.trim();
                    const player = players.get(name) || {
                        name,
                        matches: 0,
                        score: 0,
                    };
                    player.matches++;
                    player.score += goals2 - goals1;
                    players.set(name, player);
                }
            }

            return Array.from(players.values()).sort((a, b) => b.score - a.score);
            
        }
    }
}

export default api;