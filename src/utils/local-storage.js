function getItem(itemKey) {
    return localStorage.getItem(itemKey)
}

function setItem(itemKey, item) {
    localStorage.setItem(itemKey, item)
}

export {getItem, setItem}