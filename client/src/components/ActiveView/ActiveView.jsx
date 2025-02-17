import {
    DiscoveryView,
    FeedView, 
    ChallengesView,
    SettingsView,
    UserProjectsView,
    ProjectsView
} from '../Views'
import useProjects from '../../store/useProjects'
import { act, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ({ activeView }) {
    console.log(activeView)
    const { projects, setProjects } = useProjects()

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
            .from('discovery_projects')
            .select('*, users(*)')
            setProjects(data)
        }

        fetchProjects()
    }, [])
    

    if (activeView === '/feed') {
        return (
            <>
                <FeedView />
            </>
        )
    }
    
    else if (activeView == '/discovery') {
        return (
            <>
                <div>
                    <DiscoveryView projects={projects} />
                </div>
            </>
        )
    }

    else if (activeView == '/challenges') {
        return (
            <>
                <ChallengesView />
            </>
        )
    }

    else if (activeView == '/user-projects') {
        return (
            <>
                <UserProjectsView />
            </>
        )
    }

    else if (activeView == '/settings') {
        return (
            <>
                <SettingsView />
            </>
        )
    }

    else if (activeView == '/projects') {
        return (
            <>
                <ProjectsView />
            </>
        )
    }

    else {
        return (
            <>
                Nothing to see here yet
            </>
        )
    }
}