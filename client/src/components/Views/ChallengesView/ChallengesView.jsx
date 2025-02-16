import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import ChallengesModal from './ChallengesModal';
import { supabase } from '../../../lib/supabase'
import BeginnerDifIcon from '../../../assets/beginner-dif-icon.svg'
import IntermediateDifIcon from '../../../assets/intermediate-dif-icon.svg'
import AdvancedDifIcon from '../../../assets/advanced-dif-icon.svg'
import styles from './ChallengesView.module.css'

export default function ChallengesView() {
    const [uploadedUserResume, setUploadedUserResume] = useState(null)
    const [weeklyChallenges, setWeeklyChallenges] = useState([])
    const [focusedChallengeCard, setFocusedChallengeCard] = useState({})

    useEffect(() => {
        const fetchWeeklyChallenges = async () => {
            const {data, error} = await supabase.from('weekly_challenges').select('*')
            console.log(data)
            setWeeklyChallenges(data)
        }

        fetchWeeklyChallenges()

    }, [])

    const openChallengeCard = (context) => {
        setFocusedChallengeCard(context)
    }

    // Dropzone configuration
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "application/pdf": [] },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setUploadedUserResume(acceptedFiles[0])
                console.log(acceptedFiles[0])
            }
        },
    });

    const [focusedChallenge, setFocusedChallenge] = useState({
        title: ''
    })

    const handleClick = async () => {
        if (!uploadedUserResume) {
            console.log('Please upload a valid resume')
            return
        }

        const formData = new FormData()
        formData.append('resume', uploadedUserResume)

        try {
            const response = await axios.post('http://localhost:3001/upload-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            console.log(response)
        }

        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                {
                    focusedChallengeCard.title ?
                    <ChallengesModal 
                        focusedChallengeCard={focusedChallengeCard} 
                        setFocusedChallengeCard={setFocusedChallengeCard} 
                    />:
                    <div></div>
                }
                <div>
                    <ul>
                        {
                            weeklyChallenges.map((weeklyChallenge) => {
                                return (
                                    <>
                                        <li>
                                            <div>
                                                <div>
                                                    <h3>{ weeklyChallenge.title }</h3>
                                                    <p>{ weeklyChallenge.description }</p>
                                                </div>
                                                <div>
                                                    <div className={styles['weeklychallenges-card-dif-icon']}>
                                                        { weeklyChallenge.difficulty === 'beginner' && <BeginnerDifIcon /> }
                                                        { weeklyChallenge.difficulty === 'intermediate' && <IntermediateDifIcon /> }
                                                        { weeklyChallenge.difficulty === 'advanced' && <AdvancedDifIcon /> }
                                                    </div>
                                                    <p className={styles['weeklychallenges-card-dif-level']}>{ weeklyChallenge.difficulty }</p>
                                                </div>
                                                <div>
                                                    <p>Participants:</p>
                                                    <p>{ weeklyChallenge.participant_count }</p>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => openChallengeCard(weeklyChallenge)}
                                                        className={styles['challenge-card-interested-btn']}>
                                                        Interested
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}