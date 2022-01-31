import Header from '../../components/Header' 

const team = ({selectedTeam}) => {
    if (selectedTeam) {
        return (
            <div>
                <Header img={selectedTeam.logo} team={selectedTeam.team} backgroundColor={selectedTeam.color.background} letter={selectedTeam.color.letter} />
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
    let selectedTeam: [string, string, object, string]
    teams.forEach( team => {
        if (team.id === id) {
            selectedTeam = team
        }
    })
    return {
        props: {selectedTeam}
    }
}