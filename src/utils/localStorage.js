export const storeInLocalSession = (inputObject, keyvalue) => {
    localStorage.setItem(keyvalue, JSON.stringify(inputObject));
};

export const accessFromLocalSession = (keyvalue) => {
    const jsonStr = localStorage.getItem(keyvalue);
    return jsonStr ? JSON.parse(jsonStr) : null;
};
