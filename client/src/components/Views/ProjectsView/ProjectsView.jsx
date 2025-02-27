import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import styles from './ProjectsView.module.css'
import ProjectPane from './ProjectPane'

export default function ProjectsView() {
    const [userProjects, setUserProjects] = useState([])
    const [openPaneWithProject, setOpenPaneWithProject] = useState({})
    const [pendingUserProjects, setPendingUserprojects] = useState([])

    const fetchUserPendingProjects = async () => {
        const {data, error } = await supabase
        .from('pending_projects')
        .select('*, weekly_challenges(*)')
        .eq('user_id', '33b25059-a0a3-4be8-ae22-4d3a580d9429')

        console.log(data)
        setPendingUserprojects(data)
    }

    const fetchUserProjects = async () => {
        const {data, error } = await supabase
        .from('active_projects_members')
        .select('*, weekly_challenges(*)')
        .eq('user_id', '33b25059-a0a3-4be8-ae22-4d3a580d9429')

        console.log(data)
        setUserProjects(data)
    }

    useEffect(() => {
        fetchUserProjects()

        fetchUserPendingProjects()
    }, [])

    const handleClick = (project) => {
        setOpenPaneWithProject(project.weekly_challenges)
    }

    const deleteProject = async (context, project) => {
        console.log('delete', project)
        const {data, error} = await supabase
        .from(context)
        .delete()
        .eq('id', project.id)

        fetchUserProjects()

        fetchUserPendingProjects()
    }

    const postProject = async (e) => {
        e.preventDefault()
        const {data, error} = await supabase
        .from('discovery_projects')
        .insert([
            {
                title: document.querySelector('#projectTitle').value,
                metablib: document.querySelector('#projectDescription').value,
                author_id: '33b25059-a0a3-4be8-ae22-4d3a580d9429'
            }
        ])

        const { data2, error2 } = await supabase
        .from('pending_projects')
        .insert([
            {
                user_id: '33b25059-a0a3-4be8-ae22-4d3a580d9429',
                project_id: '798c4518-1a10-476b-9323-844540e60519',
            }
        ])

        fetchUserPendingProjects()

    }


    return (
        <>
            <div style={{margin: '25px'}}>
                <h2>Projects</h2>
                <div style={{marginBottom: '1rem'}}>
                    <h3 className={styles['start-project-header']}>Start a project</h3>
                    <form className={styles['post-project-form']}>
                        <div className={styles['form-group']}>
                            <label htmlFor="">Title</label>
                            <input id='projectTitle' type="text" />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="">Description</label>
                            <input id='projectDescription' type="text" />
                        </div>
                        <div>
                            <button onClick={postProject} className={styles['post-btn']}>Post</button>
                        </div>
                    </form>
                </div>
                <div className={styles['in-progress-projects']}>
                    <div className={styles['project-group-header']}>
                        <h3 className={styles['project-group-title']}>Current Projects</h3>
                        <div className={styles['projects-group-count-indicator']}>{ userProjects.length }</div>
                    </div>
                    <div>
                        <ul>
                            {
                                userProjects.map((userProject) => {
                                    return (
                                        <>
                                            <li>
                                                <div className={styles['project-group-project-card']}>
                                                    <div>
                                                        <h3>{ userProject.weekly_challenges.title }</h3>
                                                    </div>
                                                    <button onClick={() => deleteProject('active_projects_members', userProject) } className={styles['project-card-button-end']}>End project</button>
                                                    <button className={styles['project-card-button-view']} onClick={() => handleClick(userProject)}>View</button>
                                                </div>
                                            </li>
                                        </>
                                    )

                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className={styles['pending-projects']}>
                    <div className={styles['project-group-header']}>
                        <h3 className={styles['project-group-title']}>Pending Projects</h3>
                        <div className={styles['projects-group-count-indicator']}>{ pendingUserProjects.length }</div>
                    </div>
                    <div>
                        <ul>
                            {
                                pendingUserProjects.map((userProject) => {
                                    return (
                                        <>
                                            <li>
                                                <div className={styles['project-group-project-card']}>
                                                    <div>
                                                        <h3>{ userProject.weekly_challenges.title }</h3>
                                                    </div>
                                                    <button onClick={() => deleteProject('pending_projects', userProject) } className={styles['project-card-button-end']}>End project</button>
                                                    <button className={styles['project-card-button-view']} onClick={() => handleClick(userProject)}>View</button>
                                                </div>
                                            </li>
                                        </>
                                    )

                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            { openPaneWithProject.title && <ProjectPane project={openPaneWithProject} setOpenPaneWithProject={setOpenPaneWithProject} />}
        </>
    )
}