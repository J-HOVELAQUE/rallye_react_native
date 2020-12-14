export default function (userConnected = {}, action) {
    if (action.type === 'record') {
        return {
            token: action.user.token,
            status: action.user.status,
            firstName: action.user.firstname,
            lastName: action.user.name,
            email: action.user.email,
            avatar: action.user.avatar,
            nationality : action.user.nationality
        };
    } else if(action.type === 'reset'){
        return {}
    } else {
        return userConnected;
    }
}