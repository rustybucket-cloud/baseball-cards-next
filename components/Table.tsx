import styles from "../styles/Player.module.css"

import { useState, useEffect } from "react"

const axios = require('axios').default

const Table = ({id, startYear}) => {
    const [ stats, setStats ] = useState([])

    useEffect( () => {
        /* const options = {
            method: 'GET',
            url: '/api/playertable',
            params: {
                id,
                start: startYear
            },
        };
        axios.request(options).then(res => {
            console.log(res.data)
        }) */

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
                setStats(stats => [...stats, data ]) 
            })
        }
    }, [])


    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <th>Year</th>
                <th>Team</th>
                <th>AVG</th>
                <th>AB</th>
                <th>H</th>
                <th>HR</th>
                <th>BB</th>
                <th>RBI</th>
                <th>SB</th>
                <th>SLG</th>
                <th>OBP</th>
                <th>OPS</th>
            </thead>
            <tbody>
                { stats.length > 0 ? stats.map( (year) => {
                    if (year) {
                        return(
                            <tr>
                                <td>{year.season}</td>
                                <td>{year.team_abbrev}</td>
                                <td>{year.avg}</td>
                                <td>{year.ab}</td>
                                <td>{year.h}</td>
                                <td>{year.hr}</td>
                                <td>{year.bb}</td>
                                <td>{year.rbi}</td>
                                <td>{year.sb}</td>
                                <td>{year.slg}</td>
                                <td>{year.obp}</td>
                                <td>{year.ops}</td>
                             </tr>
                        )
                    }
                }) : null }
            </tbody>
        </table>
    )
}

export default Table