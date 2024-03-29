const saveToLocalStorage = (city:string) => {
    //favorites will get the current values in local storage
    //AKA saves the array in favorites
    let favorites = getlocalStorage();


    //If the name is already included in the local storage we will not push into favorites
    if(!favorites.includes(city)) {
        favorites.push(city);
    }
    //JSON.stringify insures what ever we save into local storage is a string
    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

const getlocalStorage = () => {
    if (typeof localStorage !== "undefined") {
    //Getting our values from local storage
    let localStorageData = localStorage.getItem("Favorites");

    //We check if that data is null if so we retun an empty array
    if(localStorageData == null){
        return [];
    }
    // We return an array of local storage.
    return JSON.parse(localStorageData);
}

}

const removeFromLocalStorage = (city:string) => {
    //We're saving local storage data into favorites variable
    let favorites = getlocalStorage();

    //We're finding the Index of our parameter (city)
    let namedIndex = favorites.indexOf(city);

    //remove the name from the array using the .splice method
    favorites.splice(namedIndex, 1);

    //We set our new mutated favotires array inside our local storage.
    localStorage.setItem("Favorites", JSON.stringify(favorites))

}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage};