import { useRouter } from 'next/router'

export default function () {
    const router = useRouter()

    const handleClick = (page) => {
        router.push(`/${page}`)
    }

    return (
        <>
            <header>
                <ul>
                    <li>
                        <div>
                            <button onClick={() => handleClick('register')}>Register</button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <button onClick={ () => handleClick('login') }>Login</button>
                        </div>
                    </li>
                </ul>
            </header>
            <h1>Athenid</h1>
        </>
    )
}