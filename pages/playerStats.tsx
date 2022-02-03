import mainStyles from "../styles/Main.module.css"

import Header from "../components/Header"

function playerStats() {
    return (
        <div>
           <Header img={'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'} team={'MLB Data'} backgroundColor={'#002D72'} textColor={'white'} /> 
            <div className={mainStyles.mainWrapper}>
                <main className={mainStyles.main}>
                    <h1>Player Search</h1>
                </main> 
            </div>
        </div>
    )
}

export default playerStats