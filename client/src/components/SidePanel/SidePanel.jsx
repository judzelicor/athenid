export default function ({ activeView, changeActiveView }) {
    const changeView = (view) => {
        changeActiveView(view)
    }

    console.log(activeView)

    return (
        <>
            <div className="dashboard__user-panel-data">
                <div className="dashboard__user-avatar">
                    <img src="https://i.pinimg.com/736x/72/11/38/7211381f0e4cfbdf52a57f03a2794dee.jpg" alt="" />
                </div>
                <div className="dashboard__user-information">
                    <h3>Daisuke Kambe</h3>
                    <div className="dashboard__user-panel-quick-stats">
                        <div className="dashboard__user-panel-quick-stat">
                            <span>222</span>
                            <span>Followers</span>
                        </div>
                        <div className="dashboard__user-panel-quick-stat">
                            <span>118</span>
                            <span>Following</span>
                        </div>
                        <div className="dashboard__user-panel-quick-stat">
                            <span>3</span>
                            <span>Projects</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SidePanel Navigation */}
            <nav>
                <ul>
                    <li>
                        <div><button onClick={() => changeActiveView('/feed')}>Home</button></div>
                    </li>
                    <li>
                        <div><button onClick={() => changeActiveView('/challenges')}>Challenges</button></div>
                    </li>
                    <li>
                        <div><button onClick={() => changeActiveView('/discovery')}>Discovery</button></div>
                    </li>
                    <li>
                        <div><button onClick={() => changeActiveView('/saved')}>Saved</button></div>
                    </li>
                    <li>
                        <div><button onClick={() => changeActiveView('/user-projects')}>My Projects</button></div>
                    </li>
                    <li>
                        <div><button onClick={() => changeActiveView('/invites')}>Invites</button></div>
                    </li>
                    <li>
                        <div><button onClick={() => changeActiveView('/settings')}>Settings</button></div>
                    </li>
                    <li>
                        <div><button>Log out</button></div>
                    </li>
                </ul>
            </nav>
        </>
    )
}