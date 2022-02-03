import Header from '../../components/Header'
import Card from '../../components/Card'
import Head from 'next/head'

import styles from "../../styles/Teams.module.css"
import mainStyles from "../../styles/Main.module.css"

const team = ({team, roster}) => {
    if (team) {
        return (
            <div>
                <Head>
                    <title>{team.teams}</title>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>
                </Head>
                <Header img={team.logo} team={team.team} backgroundColor={team.color.background} textColor={team.color.text} />
                <div className={mainStyles.mainWrapper}>
                    <main className={`${styles.cards} ${mainStyles.main}`}>
                        { roster.map((player,i) => <Card key={i} data={player} primaryColor={team.color.background} secondaryColor={team.color.letter} id={player.player_id} />) }
                    </main>
                </div>
            </div>
        )
    }
    else return (
        <div>
            <h1>404 error: Page not found</h1>
        </div>
    )
}
export default team


export const getServerSideProps = async (context) => {
    const id = context.params.id
    const teams = require("../../teamData.json")

    // select the correct team by route
    let team: [string, string, object, string]
    teams.forEach( selectedTeam => {
        if (selectedTeam.id === id) {
            team = selectedTeam
        }
    })

    // fetch player roster data
    const res = await fetch(`https://mlb-data.p.rapidapi.com/json/named.roster_team_alltime.bam?end_season='2021'&team_id='${id}'&start_season='2021'&all_star_sw='N'&sort_order=name_asc`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "mlb-data.p.rapidapi.com",
		"x-rapidapi-key": "c90b245b31msh46b59787848177ap15892cjsne103b05ba7a8"
	}
    })
    const data = await res.json()
    const roster = data.roster_team_alltime.queryResults.row

    return {
        props: {team, roster}
    }
}