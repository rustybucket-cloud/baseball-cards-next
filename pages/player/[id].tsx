import mainStyles from "../../styles/Main.module.css"
import styles from "../../styles/Player.module.css"

import { useEffect, useState, useCallback } from "react"
const axios = require("axios").default;

import Header from "../../components/Header"

import Table from "../../components/Table";

const player = ({name, height, weight, position, birthLocation, id, startYear}) => {
    /* const [ stats, setStats ] = useState([]) */

    /* const getData = useCallback( async () => {
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
    }, []) */

    /* useEffect( () => {
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
        })

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
    }, []) */

    return (
        <div>
            <Header img={'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'} team={'MLB Data'} backgroundColor={'#002D72'} textColor={'white'} /> 
            <div className={mainStyles.mainWrapper}>
                <main className={mainStyles.main}>
                    <h1>{name}</h1>
                    <Table id={id} startYear={startYear}/>
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