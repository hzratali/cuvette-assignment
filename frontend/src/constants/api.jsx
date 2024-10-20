const BASE_URL = process.env.REACT_APP_BACKEND_URL;
console.log("BASE_URL:", BASE_URL);

export const AUTH_API = {
    LOGIN: `${BASE_URL}/auth/register`,
    VERIFY_EMAIL: `${BASE_URL}/auth/verify-email`,
    VERIFY_PHONE: `${BASE_URL}/auth/verify-mobile`,
    ADD_JOB:`${BASE_URL}/jobs/`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
};