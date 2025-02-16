import { useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function DiscoveryView({ projects }) {

    return (
        <>
            <h2>This is the discovery view</h2>
            <div>
                <button>Post</button>
            </div>
            <div>
                {
                    projects.map((project, index) => {
                        return (
                            <>
                                <div>{ project.title }</div>
                                <p>{project.metablib}</p>
                                <div>
                                    <div className='discovery-view__project-card-avatar'>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCEFNrQp6RPluWbWC-7ElivFMesDdEYbCQ4A&s" alt="" />
                                    </div>
                                    <div>{project.users.full_name}</div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}