export const STORAGE_USER_KEY = "GYM_STORE__USER__DETAILS";
export const saveDataInLocalStorage = (key,data)=>{
    localStorage.setItem(key,JSON.stringify(data))
}

export const getDataFromLocalStorage = (key)=>{
    return localStorage.getItem(key);
}

export const removeDataFromLocalStorage = (key)=>{
  return localStorage.removeItem(key);
}