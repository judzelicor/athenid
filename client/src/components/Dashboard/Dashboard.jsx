'use client'

import {
    SidePanel,
    ActiveView
} from '../../components'

import useActiveView from '../../store/useActiveView'

export default function Dashboard() {
    const {activeView, changeActiveView} = useActiveView()

    return (
        <>
            <div className='dashboard-wrapper'>
                <div>
                    <SidePanel activeView={activeView} changeActiveView={changeActiveView} />
                </div>
                <ActiveView activeView={activeView} />
            </div>
        </>
    )
}