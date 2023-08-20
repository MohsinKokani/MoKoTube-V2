import axios from "axios";
const BASE_URL = "https://youtube-v3-alternative.p.rapidapi.com";

const options = {
    params: {
        geo: 'IN',
        // maxResults: '40'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com',
    }
};



const FetchFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
}

export default FetchFromApi;