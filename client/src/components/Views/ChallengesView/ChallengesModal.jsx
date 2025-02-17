import { useEffect, useRef } from 'react'
import styles from './ChallengesView.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import BeginnerDifIcon from '../../../assets/beginner-dif-icon.svg'
import IntermediateDifIcon from '../../../assets/intermediate-dif-icon.svg'
import AdvancedDifIcon from '../../../assets/advanced-dif-icon.svg'
import { supabase } from '../../../lib/supabase'

export default function ChallengesModal({ focusedChallengeCard, setFocusedChallengeCard }) {
    const modalWindowRef = useRef()
    const modalWindowFilterRef = useRef()

    useGSAP(() => {
        gsap.set(modalWindowRef.current, {
            scale: 0.75
        })

        gsap.to(modalWindowRef.current, {
            scale: 1,
            duration: 0.5,
            opacity: 1,
            ease: 'expo.inOut'
        })

        gsap.to(modalWindowFilterRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'expo.inOut'
        })

    }, { scope: modalWindowRef.current })


    const handleClick = () => {
        gsap.to(modalWindowRef.current, {
            scale: 0.9,
            duration: 0.5,
            opacity: 0,
            ease: 'expo.inOut'
        })

        gsap.to(modalWindowFilterRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'expo.inOut'
        })

        setTimeout(() => {
            setFocusedChallengeCard({})
        }, 500)
    }

    const findCollaborators = (challenge) => {
        gsap.to(modalWindowRef.current, {
            scale: 0.9,
            duration: 0.5,
            opacity: 0,
            ease: 'expo.inOut'
        })

        gsap.to(modalWindowFilterRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'expo.inOut'
        })

        setTimeout(() => {
            setFocusedChallengeCard({})
        }, 500)

    }

    const startSolo = async (challenge) => {
        gsap.to(modalWindowRef.current, {
            scale: 0.9,
            duration: 0.5,
            opacity: 0,
            ease: 'expo.inOut'
        })

        gsap.to(modalWindowFilterRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'expo.inOut'
        })

        setTimeout(() => {
            setFocusedChallengeCard({})
        }, 500)

        const { data, error } = await supabase
        .from('active_projects_members')
        .insert([
            {
                user_id: '33b25059-a0a3-4be8-ae22-4d3a580d9429',
                project_id: challenge.id,
                role: 'contributor'
            }
        ])
    }

    return (
        <>
            <div ref={modalWindowRef} className={styles['modal-window']}>
                <div className={styles['modal-wrapper']}>
                    <div className={styles['modal-body']}>
                        <h2>{focusedChallengeCard.title}</h2>
                        <div className={styles['judz-difficulty-info-div']}>
                            <div className={styles['weeklychallenges-card-dif-icon']}>
                                {focusedChallengeCard.difficulty === 'beginner' && <BeginnerDifIcon />}
                                {focusedChallengeCard.difficulty === 'intermediate' && <IntermediateDifIcon />}
                                {focusedChallengeCard.difficulty === 'advanced' && <AdvancedDifIcon />}
                            </div>
                            <div style={{ textTransform: 'capitalize' }}>{focusedChallengeCard.difficulty}</div>
                        </div>
                        <div className={styles['participant-info']}>
                            <div className={styles['active-participants-icon']}></div>
                            <div>{ focusedChallengeCard.participant_count } people actively participating</div>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <p>{focusedChallengeCard.description}</p>
                        </div>
                        <div>
                            <h3>Key Features</h3>
                            <p>{ focusedChallengeCard.key_features }</p>
                        </div>
                        <div className={styles['challenge-tags']}>
                            {
                                focusedChallengeCard.tags.split(',').map((tag) => {
                                    return (
                                        <>
                                            <div className={styles['challenge-tags-pill']}>{ tag }</div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles['modal-footer']}>
                        <div>
                            <p>Need help?</p>
                        </div>
                        <div>
                            <button className={styles['modal-window-sec-btn']} onClick={() => startSolo(focusedChallengeCard)}>Start solo</button>
                            <button className={styles['modal-window-pri-btn']} onClick={() => findCollaborators(focusedChallengeCard)}>Find collaborators</button>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={handleClick} ref={modalWindowFilterRef} className={styles['modal-bg-filter']}></div>
        </>
    )
}