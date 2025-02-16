import { useEffect, useRef } from 'react'
import styles from './ChallengesView.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ChallengesModal({focusedChallengeCard, setFocusedChallengeCard }) {
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

    }, {scope: modalWindowRef.current})
    

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

    return (
        <>
            <div ref={modalWindowRef} className={styles['modal-window']}>
                <h2>{ focusedChallengeCard.title }</h2>
                <div>
                    <button className={styles['modal-window-sec-btn']}>Start solo</button>
                    <button className={styles['modal-window-pri-btn']}>Find collaborators</button>
                </div>
            </div>
            <div onClick={handleClick} ref={modalWindowFilterRef} className={styles['modal-bg-filter']}></div>
        </>
    )
}