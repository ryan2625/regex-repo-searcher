let originalTitle = "< Parser.io >".split("")
let originalSub = "Search your directories for regex".split("")
let title = "< Parser.io >"
let sub = "Search your directories for regex"

const chars = [
    ...Array.from({length: 94}, (_, i) => String.fromCharCode(33 + i)),
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 
    'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 
    'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 
    'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 
    'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',"α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"
];

$(document).ready(function () {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    let time = 0
    async function titleDisplay() {
        while (time < 25) {
            let newTitle = title.split("")
            let newSub = sub.split("")
            for (let char in newTitle) {
                newTitle[char] = getRandomElement(chars)
            }
            for (char in sub) {
                newSub[char] = getRandomElement(chars)
            }
            title = newTitle.join("")
            sub = newSub.join("")
            $("#main_title").text(title)
            $("#sub_title").text(sub)
            time += 1
            await sleep(30)
        }
        for (char in title) {
            title = title.split("")
            title[char] = originalTitle[char]
            title = title.join("")
            $("#main_title").text(title)
            await sleep(8)
        }
        for (char in sub) {
            sub = sub.split("")
            sub[char] = originalSub[char]
            sub = sub.join("")
            $("#sub_title").text(sub)
            await sleep(8)
        }
    }

    

    titleDisplay()
})