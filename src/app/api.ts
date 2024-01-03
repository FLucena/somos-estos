import type {Match} from "./types"

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
    }
}

export default api;