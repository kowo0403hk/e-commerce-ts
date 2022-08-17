import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjhiMjM2MmM0YzNjNjYyNTk3YWE5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDcxNzc1NiwiZXhwIjoxNjYwOTc2OTU2fQ.Mp_yEE4U4yqEzOOhlO_N79kTuUqGIwBoqhqJ0IH8KAg";

export const apiRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
