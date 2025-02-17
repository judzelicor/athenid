import HomeIcon from '../../assets/home-icon.svg'
import SavedIcon from '../../assets/bookmarks-icon.svg'
import DiscoveryIcon from '../../assets/discovery-icon.svg'
import ChallengesIcon from '../../assets/challenges-icon.svg'
import UserProjectsIcon from '../../assets/projects-icon.svg'
import SettingsIcon from '../../assets/settings-icon.svg'
import LogoutIcon from '../../assets/logout-icon.svg'
import InboxIcon from '../../assets/inbox-icon.svg'
import { useRouter } from 'next/router'
import styles from './SidePanel.module.css'
import Logo from '../../assets/athenid-logo.svg'

export default function ({ activeView, changeActiveView }) {
    const router = useRouter()

    const changeView = (view) => {
        changeActiveView(view)
    }

    const signout = () => {

        router.push('/')

        // Clear user data in client
    }

    return (
        <>
        <div>
            <div className={styles['sidepanel-container']} style={{overflow: 'hidden'}}>
                    <div className={styles['logo']}>
                        <Logo />
                    </div>
                    <div className="dashboard__user-panel-data">
                        <div className="dashboard__user-avatar">
                            <img src="https://i.pinimg.com/736x/72/11/38/7211381f0e4cfbdf52a57f03a2794dee.jpg" alt="" />
                        </div>
                        <div className="dashboard__user-information">
                            <h3>Daisuke Kambe</h3>
                            <div className="dashboard__user-panel-quick-stats">
                                <div className="dashboard__user-panel-quick-stat">
                                    <span>222</span>
                                    <span style={{fontSize: '12px'}}>Followers</span>
                                </div>
                                <div className="dashboard__user-panel-quick-stat">
                                    <span>118</span>
                                    <span style={{fontSize: '12px'}}>Following</span>
                                </div>
                                <div className="dashboard__user-panel-quick-stat">
                                    <span>3</span>
                                    <span style={{fontSize: '12px'}}>Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SidePanel Navigation */}
                    <nav>
                        <ul>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/feed')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <HomeIcon />
                                            </div>
                                            <span>Home</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/inbox')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <InboxIcon />
                                            </div>
                                            <span>Inbox</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/challenges')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <ChallengesIcon />
                                            </div>
                                            <span>Challenges</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/discovery')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <DiscoveryIcon />
                                            </div>
                                            <span>Discovery</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/saved')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <SavedIcon />
                                            </div>
                                            <span>Saved</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/projects')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <UserProjectsIcon />
                                            </div>
                                            <span>Projects</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => changeActiveView('/settings')}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <SettingsIcon />
                                            </div>
                                            <span>Settings</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button className={styles['sidepanel-button']} onClick={() => signout()}>
                                        <div className={styles['sidepanel-option']}>
                                            <div style={{width: '25px'}} className={styles['sidepanel-option-icon']}>
                                                <LogoutIcon />
                                            </div>
                                            <span>Sign out</span>
                                        </div>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
        </>
    )
}