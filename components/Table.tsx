import styles from "../styles/Player.module.css"

import { useState, useEffect, useCallback } from "react"

const axios = require('axios').default

const Table = ({id, startYear}) => {
    const [ stats, setStats ] = useState([])

    const getData = useCallback(async () => {
        let currentYear = new Date().getFullYear()
        let years = []
        for (let i = startYear; i <= currentYear; i++) {
            const yearData = new Promise(async (resolve, reject) => {
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
                let data
                try {
                    data = await axios.request(options)
                } catch (err) {
                    reject(err)
                } finally {
                    console.log(data.data.sport_hitting_tm.queryResults.row)
                    resolve(data.data.sport_hitting_tm.queryResults.row)
                }
            })
            years.push(yearData)
        }
        Promise.all(years).then(values => {
            values.sort((a,b) => {
                return b.season - a.season
            })
            setStats(values)
        })
    }, [])

    useEffect( () => {
        setStats([])
        getData()
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
                {stats.map( (year, i) => {
                    if (year) {
                        return (
                            <tr key={i}>
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
                    else null
                }) }
            </tbody>
        </table>
    )
}

export default Table