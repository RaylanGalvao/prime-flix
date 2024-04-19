import axios from "axios";
// https://api.themoviedb.org/3/movie/now_playing?api_key=3a8c6cde3a0cdb4a9a16c59a5105c963&language=pt-br

// base da URL: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api