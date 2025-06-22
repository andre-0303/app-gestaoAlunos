import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api-alunos-sql-lite-1.onrender.com', // 🔥 sem /alunos no final
});
