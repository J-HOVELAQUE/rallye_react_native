export default function (clickedTeam = {}, action) {

    if (action.type === 'record-team') {
        return action.team;

    } else {
        return clickedTeam;
    }
}