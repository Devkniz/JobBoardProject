import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
    const token = localStorage.getItem('authToken')
    let userEmail = ''
    let userRole = ''
    let isLogged = false

    if(token) {
        const decoded = jwtDecode(token)
        const { email, role } = decoded.UserInfos

        userEmail = email
        userRole = role
        isLogged = true
    }
    
    return {userEmail, userRole, isLogged}
}