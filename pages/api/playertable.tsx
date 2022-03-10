const axios = require("axios")
require('dotenv').config()

export default function handler(req, res) {
    const startYear = req.query.start
    const id = req.query.id

    let currentYear = new Date().getFullYear()
        let searches = []
        let stats = []
        for (let i = startYear; i <= currentYear; i++) {
            const options = {
                method: 'GET',
                url: 'https://mlb-data.p.rapidapi.com/json/named.sport_hitting_tm.bam',
                params: {
                league_list_id: '\'mlb\'',
                game_type: '\'R\'',
                season: `\'${i}\'`,
                player_id: `\'${id}\'`
                },
                headers: {
                    'x-rapidapi-host': 'mlb-data.p.rapidapi.com',
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            const search = axios.request(options).then(res => {
                const data = res.data.sport_hitting_tm.queryResults.row
                console.log(data)
                stats.push(data)
                return data
            })
            searches.push(search)
        }

        // puts seasons in order
        Promise.all(searches).then(values => {
            let seasons = values
            seasons.sort((a,b) => {
                if (b.season > a.season) return 1
                else return -1
            })
            res.status(200).send(seasons)
        })
}