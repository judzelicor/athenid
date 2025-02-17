import styles from './FeedView.module.css'

export default function () {
    return (
        <>
            <div>
                <h2 className={styles['user-greeting']}>Welcome back, Daisuke!</h2>
                <div className={styles['feed-header']}>
                    <div className={styles['feed-card']}>
                        <div>2</div>
                        <div>
                            Projects Completed
                        </div>
                    </div>
                    <div className={styles['feed-card']}>
                        <div>0</div>
                        <div>
                            Ongoing Projects
                        </div>
                    </div>
                    <div className={styles['feed-card']}>
                        <div>1</div>
                        <div>
                            Pending Invitations
                        </div>
                    </div>
                </div>
                <div className={styles['nothing-to-show-yet']}>
                    <div className={styles['not-found-cat']}>
                        <img src="images/404-not-found.png" alt="" />
                    </div>
                    <div>
                        No activities yet. Come back soon!
                    </div>
                </div>
            </div>
        </>
    )
}