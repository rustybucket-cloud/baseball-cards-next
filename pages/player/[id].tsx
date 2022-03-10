import mainStyles from "../../styles/Main.module.css"
import styles from "../../styles/Player.module.css"

import { useEffect, useState, useCallback } from "react"
const axios = require("axios").default;

import Header from "../../components/Header"

import Table from "../../components/Table";

const player = ({name, height, weight, position, birthLocation, id, startYear}) => {
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

    require('dotenv').config()

    // request data
    const options = {
        method: 'GET',
        url: 'https://mlb-data.p.rapidapi.com/json/named.player_info.bam',
        params: {sport_code: '\'mlb\'', player_id: `\'${id}\'`},
        headers: {
            'x-rapidapi-host': 'mlb-data.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        }
    };
    const response  = await axios.request(options)
    const  data = response.data.player_info.queryResults.row
    const { weight, age, primary_position, name_display_first_last_html, pro_debut_date } = data

    // format height and birth country
    const height = `${data.height_feet}'${data.height_inches}"`
    const birthLocation = data.birth_state ? `${data.birth_city}, ${data.birth_state}` : `${data.birth_city}, ${data.birth_country}`
    

    // get player start year
    const startDate = new Date(pro_debut_date)
    const startYear = startDate.getFullYear()


    return {
        props: {
            name: name_display_first_last_html, height, weight, age, position: primary_position, birthLocation, id, startYear
        }
    }
}