export default function setItem(name, data) {
    localStorage.setItem(`${name}`, JSON.stringify(data))
}