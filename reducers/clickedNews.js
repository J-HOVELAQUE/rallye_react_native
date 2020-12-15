export default function (clickedNews = {}, action) {

    if (action.type === 'record-news') {
        return action.news;

    } else {
        return clickedNews;
    }
}