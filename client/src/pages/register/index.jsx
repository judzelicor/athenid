import { useForm } from 'react-hook-form'
import { Select } from '@mantine/core'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function () {
    const {control, register, handleSubmit, setValue, formState: { errors }} = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            userRole: 'student'
        }
    })

    const router = useRouter()

    const [codeIsSent, setCodeIsSent] = useState(false)

    const submitLogic = async (userData) => {
        const userFullName = userData.fullName
        const userRole = userData.useRole
        const userEmail = userData.email
        
        // Password should be encrypted
        const userPassword = userData.password

        // const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        //     email: userEmail,
        //     password: userPassword,
        //     options: {
        //         data: {
        //             full_name: userFullName,
        //             role: userRole
        //         }
        //     }
        // })
        
        // // Handle signup error
        // if (signUpError) {
        //     console.log(signUpError.message)

        //     return
        // }

        // console.log(user)

        // const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email'})

        setCodeIsSent(true)

        // Check if OTP matches

        // const { error: insertError } = await supabase
        // .from('users')
        // .insert([
        //     {
        //         id: user.id,
        //         full_name: fullName,
        //         role: userRole
        //     }
        // ])

        // // Handle insert error
        // if (insertError) {
        //     console.log('Error storing user information. Please try again.')

        //     return
        // }
    }

    const verifyUser = () => {
        router.push('/dashboard')
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(submitLogic)}>
                {/* User full name */}
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input 
                        type='text'
                        id='fullName'
                        {...register('fullName', { required: 'Valid full name is required' })}
                    />
                    {errors.fullName && <p>{errors.fullName.message}</p>}
                </div>

                {/* User account email */}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email'
                        id='email'
                        {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@ualberta\.ca$/,
                                message: 'You must use a valid UAlberta email address',
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                {/* User account password */}
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password'
                        id='password'
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                {/* User role */}
                <div>
                    <label htmlFor="userRole">What best describes you?</label>
                    <Select
                        data={[
                            {
                                value: 'student',
                                label: 'Student'
                            },
                            {
                                value: 'staff',
                                label: 'Staff'
                            }
                        ]}
                        placeholder='Student'
                        control={control}
                        onChange={(_value, option) => {
                            console.log(option)
                            setValue('userRole', option.value)

                        }}
                    />
                </div>
                { 
                codeIsSent && 
                <input 
                    type='text'
                    pattern='[0-9]{6}'
                    maxLength={6}
                    {
                        ...register('otp', {
                            required: 'OTP is required',
                            pattern: {
                                value: /^[0-9]{6}$/,
                                message: 'Please enter the 6 digit code you received in your email'
                            }
                        })
                    }

                /> 
                }
                {
                    codeIsSent ? <button onClick={verifyUser}>Verify</button>
                    : <button>Send Code</button>
                }
            </form>
        </>
    )
}