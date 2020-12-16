export default function (chatHistory = [], action) {

    if (action.type === 'storeChat') {
        let newHistory = [...chatHistory]
        action.newMsg.map((msg) => {
            newHistory.push({
                msg,
                room: action.roomName
            })
        })

        console.log('REDUCER HISTORY : ', newHistory)
        return newHistory

    } else {
        return chatHistory
    }
}