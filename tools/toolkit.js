import AsyncStorage from '@react-native-community/async-storage';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';


//// Getting data in local storage if existing ////

const getData = async () => {

    try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            const rawAnswer = await fetch(`${serverUrl}/user/get-user?token=${value}`, {
                method: 'GET',
            });
            const answer = await rawAnswer.json();
            return answer
        }
    } catch (e) {
        console.log('ERROR', e);
    }
}

//// Store data in local storage /////
const storeData = async (dataToken, dataStatus) => {

    try {
        await AsyncStorage.setItem('token', dataToken)
    } catch (e) {
        // saving error
        console.log('ERROR', e);
    }

    try {
        await AsyncStorage.setItem('status', dataStatus)
    } catch (e) {
        // saving error
        console.log('ERROR', e);
    }
}

export { getData, storeData }