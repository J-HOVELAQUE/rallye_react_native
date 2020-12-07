export default function (userConnected = {}, action) {
    if (action.type == 'record') {
        return {
            token: action.user.token,
            status: action.user.status
        };
    } else {
        return userConnected;
    }
}