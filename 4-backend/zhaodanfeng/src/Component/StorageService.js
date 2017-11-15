const StorageService = {
    init: init,
    setItems: setItems,
    getItems: getItems,
    addItem: addItem,
    removeItems: removeItems,
    updateItem: updateItem,
    clearAll: clearAll
};

function init(key) {
    let storage = localStorage.getItem(key);
    if(!storage) {
        localStorage.setItem(key, JSON.stringify([]));
    }
    return true;
}

function setItems(key, values) {
    return localStorage.setItem(key, JSON.stringify(values));
}

function getItems(key) {
    return JSON.parse(localStorage.getItem(key));
}

function addItem(key, value) {
    let arr = JSON.parse(localStorage.getItem(key));
    arr.unshift(value);
    localStorage.setItem(key, JSON.stringify(arr));
    return arr;
}

function removeItems(key, ids) {
    let arr = JSON.parse(localStorage.getItem(key));
    const newArr = [];
    arr.forEach(function(value) {
        if(ids.indexOf(value.id) < 0) {
            newArr.push(value);
        }
    }, this);
    localStorage.setItem(key, JSON.stringify(newArr));
    return newArr;
}

function updateItem(key, id, newValue) {
    let arr = JSON.parse(localStorage.getItem(key));
    arr.forEach(function(value){
        if(value.id === id) {
            value = newValue;
        }
    }, this);
    localStorage.setItem(key, JSON.stringify(arr));
    return arr;
}

function clearAll(key) {
    return localStorage.removeItem(key);
}

export default StorageService;
