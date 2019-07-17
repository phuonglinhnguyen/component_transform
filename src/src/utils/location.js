const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const getBaseURL = () => { return baseUrl }
export const getURL = (url) => {
    return baseUrl + url;
}
export const redirect = (path) => {
    if (document) {
        let sub = path.indexOf('/') === 0 ? '' : '/';
        document.location.replace(document.location.origin + sub + path);
        return true;
    }
    return false;
}
export const redirectApp = (path) => {
    if (document) {
        let sub = path.indexOf('/') === 0 ? '' : '/';
        let nextPath = document.location.origin + sub +(path?path+"/":'')
        if(document.location.href!==nextPath){
            document.location.replace(nextPath);
        }
        return true;
    }
    return false;
}