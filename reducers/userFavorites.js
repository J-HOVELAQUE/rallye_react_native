export default function (userFavorites = [], action) {
    // if (action.type === 'modifyFavoriteTeams') {
    //     let newFavorites = [...userFavorites]
    //     let index = newFavorites.indexOf(action.numTeam)

    //     if (index < 0) {
    //         newFavorites.push(action.numTeam)
    //     } else {
    //         newFavorites.splice(index, 1)
    //     }
    //     return newFavorites
    if (action.type === 'addFavoriteTeam') {
        let newFavorites = [...userFavorites]
        newFavorites.push(action.numTeam)
        return newFavorites

    } else if (action.type === 'removeFavoriteTeam') {
        let newFavorites = [...userFavorites]
        let index = newFavorites.indexOf(action.numTeam)
        newFavorites.splice(index, 1)
        return newFavorites
        
    } else if(action.type === 'retrieveFavoriteTeam'){
        console.log('REDUCE : ', action.listFavorites)
        return action.listFavorites
    } else {
        return userFavorites
    }
}