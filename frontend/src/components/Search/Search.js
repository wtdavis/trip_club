import * as userActions from '../../store/users'
import { useState, useEffect } from 'react'

const Search = ({setMatches, setCurrCollaborator}) => {
    const [search, setSearch] = useState('')
    const [matchingUsers, setMatchingUsers] = useState([])

    useEffect(() => {
        // debugger
        console.log('Hello from useEffect')
        const getMatchingUsers = async () => {
            try {
                const users = await userActions.fetchMatchingUsers(search)
                console.log(users)
                // debugger
                let userMatches = users.map(user => {
                    // debugger
                    return {username: user.username, _id: user._id}
                })
                // debugger
                console.log(userMatches)
                setMatchingUsers(userMatches)
            }
            catch(err) {
                console.log(err)
            }
        }
        
        getMatchingUsers()
        setMatches(matchingUsers)
    }, [search])

    return (
        <>
        <input type='text' list='users' value={search} onChange={(e) => {
            setSearch(e.target.value)
            setCurrCollaborator(e.target.value)
        }} />
        <datalist id='users'>
            {matchingUsers.map(user => <option>{user.username}</option>)}
            {/* <option>Hello from option</option> */}
        </datalist>
        </>
    )
}

export default Search