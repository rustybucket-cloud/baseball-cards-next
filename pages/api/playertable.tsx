const axios = require('axios')

export default function handler(req, res) {
    const startYear = req.query.start
    const id = req.query.id

    /* let stats = []
    try {
        const getData = new Promise( (resolve, reject) => {
            let currentYear = new Date().getFullYear()
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
                'x-rapidapi-key': 'c90b245b31msh46b59787848177ap15892cjsne103b05ba7a8'
                }
            };
            axios.request(options).then(res => {
                const data = res.data.sport_hitting_tm.queryResults.row
                stats.push(data)
            })
        }
        
        )
        
            
        }
    }
    finally {
       res.status(200).send(stats) 
    } */
}