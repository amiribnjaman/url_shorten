/*
** CHECK URL VALIDATION USING REGEX
*/ 
export const urlValidateRegex = (originalUrl: string) => {

    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/.*)?$/;

    const checkUrl = urlPattern.test(originalUrl);
    // console.log(checkUrl); 

    return checkUrl
}