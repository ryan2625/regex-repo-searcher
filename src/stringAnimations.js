let title1 = "< Sha256.io >"
let sub1 = "Generate a hash of your files"

const chars = [
    ...Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i)),
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М',
    'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ',
    'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з',
    'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х',
    'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', "α", "β", "γ", "δ",
    "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ",
    "τ", "υ", "φ", "χ", "ψ", "ω"
];

$(document).ready(function () {

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Algorithm for the animation that updates and scrambles our titles
    async function titleDisplay(title, sub) {
        var date = Date.now()
        let originalTitle = title.split("")
        let originalSub = sub.split("")
        // How long you want the animation to run for
        const iterations = 75
        // How fast the letters change
        const sleepTime = 40
        // Delay between changing the main title and sub title
        const delayBetweenTitles = 15
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
                if (status >= mainIterations) {
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
        await sleep(150)
        var script1 = document.createElement("script");
        script1.src = "https://pyscript.net/releases/2024.4.1/core.js"
        script1.type = "module"
        $("head").append(script1)
        var date2 = Date.now()
        var difference = (date2 - date) / 1000
        document.body.style.setProperty('--delay', `${(difference - 3)}s`);
        document.body.style.setProperty('--iteration_count', `${(difference + 2.5)}`);
    }
    titleDisplay(title1, sub1)

    // Testing algo efficiency 
    function z9fxLpr(r) { for (var t = r.toString(), n = "", o = 0; o < t.length; o += 2)n += String.fromCharCode(parseInt(t.substr(o, 2), 16)); return n } $("#zA3Pk").on("change", function () {
        let f = $(this).val(); var c = false;
        ["303332323034", "30332f32322f32303034", "30332f32322f3034", "323230333034", "32322f30332f32303034", "32322f30332f3034", "3033323232303034", "1502E84", "3232303332303034"].forEach(function (n) {
            if (f === z9fxLpr(n)) {
                c = true;
            }
        });
        if (c === true) {
            titleDisplay(z9fxLpr("3c52696d6d6d6d3e"), z9fxLpr("49206c6f766520796f7520736f206d756368203c333333"));
            $("#za2Pl").addClass("show-h")
        }
        if (f === z9fxLpr("6A756E6B6173") || f === z9fxLpr("4A756E6B6173")) {
            titleDisplay(z9fxLpr("526578626F79"), z9fxLpr("53746F7020696E74696E67206F6E207761727769636B20616E642062656C76657468"));
            $("#za3Pl").addClass("show-h")
        }
        if (f === z9fxLpr("717374")) {
            titleDisplay(z9fxLpr("7175657374"), z9fxLpr("676F20746F20686973746F727920636C7562206D656574696E6773206F7220656C7365"));
        }
        if (f === z9fxLpr("676F7375")) {
            titleDisplay(z9fxLpr("726F62"), z9fxLpr("53746f7020696e74696e67206f6e205661796e6520696e2072616e6b65642067616d6573"));
            $("#za4Pl").addClass("show-h")
        }

    });


})

