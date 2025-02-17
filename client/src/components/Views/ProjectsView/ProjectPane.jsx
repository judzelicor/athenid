import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import styles from './ProjectsView.module.css'
import CloseIcon from '../../../assets/close-icon.svg'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ProjectPane({ project, setOpenPaneWithProject }) {
    const projectsViewPaneRef = useRef()

    useGSAP(() => {
        gsap.to(projectsViewPaneRef.current, {
            duration: 0.3,
            right: 0,
            ease: 'expo.inOut'
        })

    }, { scope: projectsViewPaneRef.current })

    const closePane = () => {
        gsap.to(projectsViewPaneRef.current, {
            duration: 0.3,
            right: '-100%',
            ease: 'expo.inOut'
        })
        setTimeout(() => {
            setOpenPaneWithProject({})
        }, 500)
    }


    return (
        <>
            <div className={styles['project-pane']} ref={projectsViewPaneRef}>
                <h2 className={styles['project-pane-title']}>{ project.title }</h2>
                <div onClick={closePane} className={styles['minimize-pane-icon']}>
                    <CloseIcon />
                </div>
                <div className='project-specifications-pane'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.specifications}</ReactMarkdown>
                </div>
            </div>
        </>
    )
}