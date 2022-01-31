import {useRouter} from 'next/router'
import { useState, useEffect } from 'react'

import { Head } from 'next/head'
import Header from '../../components/Header' 

const team = ({selectedTeam}) => {
    const router = useRouter()
    const {id} = router.query
    const [ team, setTeam ] = useState(null)
    
    if (selectedTeam) {
        return (
            <div>
                <Header img={selectedTeam.logo} team={selectedTeam.team} backgroundColor={selectedTeam.color.background} letter={selectedTeam.color.letter} />
            </div>
        )
    }
    else return null
}
export default team


export const getServerSideProps = async (context) => {
    const id = context.params.id
    const teams = require("../../teamData.json")

    // select the correct team by route
    let selectedTeam = []
    teams.forEach( team => {
        if (team.id === id) selectedTeam = team
    })

    return {
        props: {selectedTeam}
    }
}