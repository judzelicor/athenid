import {
    DiscoveryView,
    FeedView, 
    ChallengesView,
    SettingsView,
    UserProjectsView
} from '../Views'
import useProjects from '../../store/useProjects'
import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ({ activeView }) {
    const { projects, setProjects } = useProjects()

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
            .from('discovery_projects')
            .select('*, users(*)')
            setProjects(data)
        }

        fetchProjects()
    }, [projects, setProjects])
    

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

    else {
        return (
            <>
                Nothing to see here yet
            </>
        )
    }
}