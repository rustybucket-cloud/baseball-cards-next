const axios = require("axios").default;
require('dotenv').config()

/**
 * requests player statistics data from rapidapi and responds with received data
 * @param req user query, containts player id and player position
 * @param res response, sends player stats
 */
export default function handler(req, res) : void {
    const id = req.query.id
    const position = req.query.position

    let infoOptions = {
        method: 'GET',
        url: 'https://mlb-data.p.rapidapi.com/json/named.player_info.bam',
        params: {sport_code: '\'mlb\'', player_id: `\'${id}\'`},
        headers: {
            'x-rapidapi-host': 'mlb-data.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        }
    }
    
    
    // gets player stats from rapidapi and responds
    let options: object;
    if (position !== 'P') {
        options = {
        method: 'GET',
        url: 'https://mlb-data.p.rapidapi.com/json/named.sport_career_hitting.bam',
        params: {player_id: `\'${id}\'`, game_type: '\'R\'', league_list_id: '\'mlb\''},
        headers: {
            'x-rapidapi-host': 'mlb-data.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        }
        };
    } else {
        options = {
            method: 'GET',
            url: 'https://mlb-data.p.rapidapi.com/json/named.sport_career_pitching.bam',
            params: {player_id: `\'${id}\'`, league_list_id: '\'mlb\'', game_type: '\'R\''},
            headers: {
            'x-rapidapi-host': 'mlb-data.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
            }
        };
    }

    axios.request(infoOptions).then( (response) => {
        const { height_feet, height_inches, weight, throws, bats } = response.data.player_info.queryResults.row

        axios.request(options).then(function (response) {
            const stats = position === 'P' ? response.data.sport_career_pitching.queryResults.row : response.data.sport_career_hitting.queryResults.row
            res.status(200).send({ height: `${height_feet}'${height_inches}"`, weight, stats, hand: `Throws: ${throws} Bats: ${bats}` })
        })
    })
    
    .catch(function (error) {
        console.error(error);
    });
}