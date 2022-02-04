import mainStyles from "../../styles/Main.module.css"
import styles from "../../styles/Player.module.css"

import { useEffect, useState } from "react"
const axios = require("axios").default;

import Header from "../../components/Header"

const player = ({name, height, weight, position, birthLocation, id, startYear}) => {
    const [ stats, setStats ] = useState([])

    useEffect( () => {
        let currentYear = new Date().getFullYear()

        const getData = async () => {
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
                const res = await axios.request(options)
                const data = res.data.sport_hitting_tm.queryResults.row
                setStats(stats => [...stats, data ])
            }
        }
        getData()
    }, [])

    return (
        <div>
            <Header img={'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'} team={'MLB Data'} backgroundColor={'#002D72'} textColor={'white'} /> 
            <div className={mainStyles.mainWrapper}>
                <main className={mainStyles.main}>
                    <h1>{name}</h1>
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
                </main> 
            </div>
        </div>
    )
}

export default player

export const getServerSideProps = async (context) => {
    const id = context.params.id

    // request data
    const options = {
    method: 'GET',
    url: 'https://mlb-data.p.rapidapi.com/json/named.player_info.bam',
    params: {sport_code: '\'mlb\'', player_id: `\'${id}\'`},
    headers: {
        'x-rapidapi-host': 'mlb-data.p.rapidapi.com',
        'x-rapidapi-key': 'c90b245b31msh46b59787848177ap15892cjsne103b05ba7a8'
    }
    };
    const response  = await axios.request(options)
    const  data = response.data.player_info.queryResults.row
    const { weight, age, primary_position, name_display_first_last_html, start_date } = data

    // format height and birth country
    const height = `${data.height_feet}'${data.height_inches}"`
    const birthLocation = data.birth_state ? `${data.birth_city}, ${data.birth_state}` : `${data.birth_city}, ${data.birth_country}`
    

    // get player start year
    const startDate = new Date(start_date)
    const startYear = startDate.getFullYear()


    return {
        props: {
            name: name_display_first_last_html, height, weight, age, position: primary_position, birthLocation, id, startYear
        }
    }
}