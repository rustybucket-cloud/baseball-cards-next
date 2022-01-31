import styles from "../styles/Header.module.css"

function Header(props) {
    return (
        <div style={{backgroundColor: props.backgroundColor, color: props.letterColor}} className={styles.headerWrapper}>
            <header className={styles.header}>
                <div className={styles.teamData}>
                    <figure className={styles.logo}><img className={styles.img} src={props.img} /></figure>
                    <p>{props.team}</p> 
                </div>
                
                <nav className={styles.nav}>
                    <select>
                        <option>Select One</option>
                    </select>
                    <ul className={styles.ul}>
                        <li>Pitchers</li>
                        <li>Position Players</li>
                        <li>All Players</li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;