import styles from "../styles/Header.module.css"
const teams = require("../teamData.json")
import Router from "next/router";

import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
/* import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas) */

function Header(props) {
    // routes to another team page
    const handleChange = ({currentTarget}) => {
        if (currentTarget.value === "select team") return
        Router.push(`/teams/${currentTarget.value}`)
    }

    return (
        <div style={{backgroundColor: props.backgroundColor, color: props.textColor}} className={styles.headerWrapper}>
            <header className={styles.header}>
                <div className={styles.teamData}>
                    <figure className={styles.logo}><img className={styles.img} src={props.img} /></figure>
                    <p>{props.team}</p> 
                </div>
                
                <nav className={styles.nav}>
                    <select onChange={handleChange}>
                        <option value="select team">Select Team</option>
                        { teams.map( (team, i) => <option value={team.id} key={i}>{team.team}</option>)}
                    </select>
                    <ul className={styles.ul}>
                        <li>Team Rosters</li>
                        <li>Team Stats</li>
                        <li>Records</li>
                    </ul>
                </nav>
                <FontAwesomeIcon icon={faBars} className={styles.hamburger} />
            </header>
        </div>
    );
}

export default Header;