import { GoogleLogin } from '@react-oauth/google';

export function GoogleAuthBtn() {
    return (
        <GoogleLogin onSuccess={credentials => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google/callback`,
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id_token: credentials.credential})
            }
            ).then(r => {
                return r.json();
            }).then(r => {
                console.log(`response ${JSON.stringify(r)}`) // access + refresh tokens
            })
        }}
        onError={() => {
            console.error("Login Failed")
        }}/>
    )
}
