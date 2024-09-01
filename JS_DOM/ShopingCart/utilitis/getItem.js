export default function getItem(name) {
    const previousItems = localStorage.getItem(name);
    if (previousItems) {
        const Item = JSON.parse(previousItems);
        return Item;
    }
    return null;
}