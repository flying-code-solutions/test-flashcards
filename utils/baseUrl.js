const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.example.com"
    : "http://localhost:3000";

export default baseUrl;