let originalTitle = "< Parser.io >".split("")
let originalSub = "Search your directories with regex".split("")
let title = "< Parser.io >"
let sub = "Search your directories with regex"

const chars = [
    ...Array.from({length: 94}, (_, i) => String.fromCharCode(33 + i)),
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 
    'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 
    'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 
    'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 
    'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',"α", "β", "γ", "δ", 
    "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", 
    "τ", "υ", "φ", "χ", "ψ", "ω"
];

$(document).ready(function () {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Algorithm for the animation that updates and scrambles our titles
    async function titleDisplay() {
        // How long you want the animation to run for
        const iterations = 70
        // How fast the letters change
        const sleepTime = 37
        // Delay between changing the main title and sub title
        const delayBetweenTitles = 5
        let time = 0
        while (time < iterations) {
            let newTitle = title.split("")
            let newSub = sub.split("")
            // Go through our title characters and decide to either replace it
            // with a random character or to update it with the original and 
            // final character (we calculate its distance from the front of
            // the array and update the string sequentially.)
            for (let char in newTitle) {
                let status = time + newTitle.length - char 
                let mainIterations = iterations - newSub.length - delayBetweenTitles
                if (status >=  mainIterations) {
                    newTitle[char] = originalTitle[char]
                } else {
                newTitle[char] = getRandomElement(chars)
                }
            }
            
            for (char in newSub) {
                let status = time + newSub.length - char 
                if (status >= iterations) {
                    newSub[char] = originalSub[char]
                } else {
                newSub[char] = getRandomElement(chars)
                }
            }
            title = newTitle.join("")
            sub = newSub.join("")
            $("#main_title").text(title)
            $("#sub_title").text(sub)
            time++
            await sleep(sleepTime)
        }
    }

    titleDisplay()

})