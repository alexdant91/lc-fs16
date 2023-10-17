const Profile = ({auth, logout}) => {
    return ( 
        <>
            <h1>Profile</h1>
            <pre>
                {
                    JSON.stringify(auth, null, 2)
                }
            </pre>
            <button onClick={logout}>Logout</button>
        </>
    ) 
}

export default Profile