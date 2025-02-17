import { useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import TeamIcon from '../../../assets/team-icon.svg'
import styles from './DiscoveryView.module.css'

export default function DiscoveryView({ projects }) {
    console.log(projects)
    return (
        <>
        <div style={{margin: '25px'}}>
            <div>
                {
                    projects.map((project, index) => {
                        return (
                            <>
                                <div className={styles['discovery-hub-project-card']}>
                                    <div className={styles['discovery-hub-card-header']}>
                                        <h2 className={styles['discovery-hub-project-card-title']}>
                                            <span className={styles['project-title']}>{ project.title }</span>
                                            <span className={styles['team-icon']}><TeamIcon/></span>
                                            <span className={styles['team-size-count']}>{project.team_size}/{project.max_team_size}</span>
                                        </h2>
                                    </div>
                                    <div>
                                        <h3 className={styles['metablib-header']}>Metablib</h3>
                                    </div>
                                    <div className={styles['discovery-project-body']}>
                                        {project.metablib}
                                    </div>
                                    <div className={styles['discovery-project-card-author']}>
                                        <div className='discovery-view__project-card-avatar'>
                                            <img src={`${project.users.avatar}`} alt="" />
                                        </div>
                                        <div>{project.users.full_name}</div>
                                    </div>
                                    { '33b25059-a0a3-4be8-ae22-4d3a580d9429' != project.users.id && <button className={styles['discovery-project-apply-btn']}>Apply</button> }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}