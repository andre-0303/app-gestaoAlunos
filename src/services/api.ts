import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api-alunos-sql-lite-2.onrender.com', 
});
