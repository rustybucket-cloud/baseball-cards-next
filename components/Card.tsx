import styles from "../styles/Card.module.css";
import { useState, useEffect } from "react"
import axios from "axios";

function Card(props) {
    const [ flipped, setFlipped ] = useState(false)
    const [ stats, setStats ] = useState(null)

    const player = props.data

    /**
     * gets player stats, sends request to local api which sends request to rapidapi and calculates
     *  */ 
    useEffect( (): void => {
        const options = {
            method: 'GET',
            url: '/api/playerinfo',
            params: {id: `${props.id}`, position: player.primary_position},
        };
        axios.request({method: "GET", url: '/api/playerinfo', params: {id: `${props.id}`, position: player.primary_position}}).then(function (response) {
            setStats(response.data)
            if (player.primary_position === 'p') console.log(response.data)
        })
    }, [])

    /**
     * flips cards on click
     *  */ 
    const handleClick = () => {
        setFlipped(!flipped)
    }

    
    if (stats) {
    return (
        <div className={styles.scene} onClick={handleClick}>
            <div className={`${styles.card} ${flipped ? styles.is_flipped : null }`}>
                <div className={`${styles.card__face} ${styles.face_front}`} style={{backgroundColor: props.primaryColor}}>
                    <h3>{player.name_first_last}</h3>
                    <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/r_max/w_180,q_auto:best/v1/people/${player.player_id}/headshot/silo/current`} style={{width: '9rem', height: 'auto'}}/>
                    <p className="">{player.primary_position}</p>
                </div>
                <div className={`${styles.card__face_back} ${styles.card__face}`} style={{backgroundColor: props.secondaryColor, fontSize: '14px', display: 'flex', flexDirection: "column", alignItems: 'center'}}>
                    <div>
                        <p>6&apos;2 250lbs</p>
                        <p>Throws: R Bats: R</p>
                        <p>Career Stats</p>
                        {player.primary_position !== 'P' ? <table style={{fontSize: '14px', textAlign: 'center'}}>
                            <thead>
                                <th>G</th>
                                <th>H</th>
                                <th>HR</th>
                                <th>AVG</th>
                                <th>SLG</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{stats.g ? stats.g : 0}</td>
                                    <td>{stats.h ? stats.h : 0}</td>
                                    <td>{stats.hr ? stats.hr : 0}</td>
                                    <td>{stats.avg ? stats.avg : '.000'}</td>
                                    <td>{stats.slg ? stats.slg : '.000'}</td>
                                </tr> 
                            </tbody>
                            
                        </table> :
                        <table>
                            <thead>
                                <th>IP</th>
                                <th>ERA</th>
                                <th>WHIP</th>
                                <th>SO</th>
                                <th>AVG</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{stats.ip ? stats.ip : 0}</td>
                                    <td>{stats.era ? stats.era : 0}</td>
                                    <td>{stats.whip ? stats.whip : 0}</td>
                                    <td>{stats.so ? stats.so : 0}</td>
                                    <td>{stats.avg ? stats.avg : '.000'}</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    );
    }
    else {
        return (
            <div className={styles.loading}></div>
        )
    }
}

export default Card