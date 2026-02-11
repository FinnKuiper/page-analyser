export default defineEventHandler((event) => {
    const url = getQuery(event);
    console.log(url);
    return url;
});