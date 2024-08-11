/*
TODO 

On enter in CMD, remove the blinking cursor on $(this), 
make sure input is disabled, add event listener for 
the new input dynamically created )$.input-enter . on("input") etc

set the new
*/

$(document).ready(function () {
    var searchTerms = []
    var prevLen = 0
    var count = 0
    var lenStack = [0]
    var stringToAdd = ""
    const color_values = {
        "0": "#000000",
        "1": "#3a57fc",
        '2': '#00e021',
        '3': '#00d1b2',
        '4': '#e80000',
        '5': '#c647ff',
        '6': '#e1ed00',
        '7': '#fcfcfc',
        '8': '#c7c7c7',
        '9': '#54c6ff',
        'a': '#40ff5c',
        'b': '#00ffd9',
        'c': '#ff1919',
        'd': '#d679ff',
        'e': '#fcff92',
        'f': '#ffffff',
        '+': '#ebdbff' //Secret bonus - I love this color
    }
    /* 
    A very convoluted way I found to ensure the cursor 
    is always right after the last letter you entered in the 
    input. The width of an HTML input has weird interactions
    with how the letters line up and the scaling is not
    completely even. We could not simply use width:fit content
    or text-align to fix this situation. To ensure characters 
    line up, add 8/9 pixels depending on count and change the
    width of the parent div instead of the input directly. 
    */
    var listener = function (e) {
        // Detect if user is deleting or adding character to input
        if ($(this).val().length > prevLen) {
            if (count % 5 == 0) {
                lenStack.push(8)
            }
            else {
                lenStack.push(9)
            }
        } else {
            lenStack.pop()
        }
        $(".inner").css('width', (lenStack.reduce((total, currVal) => total + currVal)))
        count += 1
        prevLen = $(this).val().length
    }

    async function handleCommand(command) {
        splitCommand = command.split(" ")
        if (splitCommand[0] == "color") {
            if (splitCommand.length != 2) {
                stringToAdd += `<span>Invalid color options given.<span/></br></br>`
                return true
            }
            else if (splitCommand[1].charAt(0) == splitCommand[1].charAt(1)){
                stringToAdd += `<span>The foreground and background colors cannot have the same value.<span/></br></br>`
                return true
            }
            else if (splitCommand[1] == '/?') {
                stringToAdd += `
0	Black <br>
1	Blue <br>
2	Green <br>
3	Aqua <br>
4	Red <br>
5	Purple <br>
6	Yellow <br>
7	White <br>
8	Gray <br>
9	Light blue <br>
a	Light green <br>
b	Light aqua <br>
c	Light red <br>
d	Light purple <br>
e	Light yellow <br>
f	Bright white <br>
Color can be any valid hexadecimal number <br>
Example to change the screen green and the text black: <br>
color a0`

            } else if (Object.keys(color_values).includes(splitCommand[1].charAt(0)) && Object.keys(color_values).includes(splitCommand[1].charAt(1)) && command.length == 8) {
                $(".prompt-body").css("color", color_values[command.charAt(7)])
                $(".prompt-body").css("background-color", color_values[command.charAt(6)])
                document.body.style.setProperty('--terminal_bg_color', color_values[command.charAt(6)]);
                document.body.style.setProperty('--terminal-color', color_values[command.charAt(7)]);
            } else {
                stringToAdd += `<span>Invalid color options given.<span/></br></br>`
            }
            return true
        }

        if (command === "dir") {
            var file_name = $('.moz-files')[0].files[0].name
            stringToAdd += `<span>File name: ${file_name}<span/></br></br>`
            return true
        }

        if (command === "certutil -hashfile sha256") {
            var file_name = $('.moz-files')[0].files[0].name
            stringToAdd += `<span>Selected algorithm: Sha256</br></br>`
            searchTerms.push("ASD")
            const file = $(".moz-files")[0].files[0];
            if (file) {
                const arrayBuffer = await file.arrayBuffer();
                const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                $("#final-msg").text(hashHex)
            }
            return true
        }
        /*
        if (command.substring(0, 6) == "op add") {
            if (splitCommand.length == 3) {
                if (searchTerms.indexOf(splitCommand[2]) === -1) {
                    stringToAdd += `<span>Added "${splitCommand[2]}" to list of search terms.<span/></br></br>`
                    searchTerms.push(splitCommand[2])
                } else {
                    stringToAdd += `<span>The phrase "${splitCommand[2]}" already exists your list of search terms.<span/></br></br>`
                }
            } else {
                stringToAdd += "Invalid number of parameters.</br></br>"
            }
            return true
        }
        else if ((command.substring(0, 9) == "op delete")) {
            if (splitCommand.length == 3) {
                if (searchTerms.indexOf(splitCommand[2]) === -1) {
                    stringToAdd += `<span>The phrase "${splitCommand[2]}" does not exist in your list of search terms.<span/></br></br>`
                } else {
                    stringToAdd += `<span>Removed "${splitCommand[2]}" from list of search terms.<span/></br></br>`
                    searchTerms = searchTerms.filter(term => term !== splitCommand[2])
                }
            } else {
                stringToAdd += "Invalid number of parameters.</br></br>"
            }
            return true
        }
        else if (command.substring(0, 10) == "op replace") {
            if (splitCommand.length == 4) {
                if ((searchTerms.indexOf(splitCommand[2]) === -1)) {
                    stringToAdd += `<span>The phrase "${splitCommand[2]}" does not exist in your list of search terms.<span/></br></br>`
                    return true
                } else if (searchTerms.indexOf(splitCommand[3]) !== -1) {
                    stringToAdd += `<span>The phrase "${splitCommand[3]}" already exists in your list of search terms.<span/></br></br>`
                } else {
                    searchTerms[searchTerms.indexOf(splitCommand[2])] = splitCommand[3]
                    stringToAdd += `<span>Replaced "${splitCommand[2]}" with "${splitCommand[3]}".<span/></br></br>`
                }
            } else {
                stringToAdd += "Invalid number of parameters.</br></br>"
            }
            return true
        }
        else if (command.substring(0, 7) == "op list") {
            if (splitCommand.length == 2) {
                if (searchTerms.length === 0) {
                    stringToAdd += "Your search term list is empty.</br></br>"
                } else {
                    stringToAdd += "Your search term list:</br>"
                    for (term in searchTerms) {
                        stringToAdd += `${searchTerms[term]} </br>`
                    }
                    stringToAdd += "</br>"
                }
            } else {
                stringToAdd += "Invalid number of parameters.</br></br>"
            }
            return true
        } 
            */
        else {
            return false
        }
    }

    var inputListener = async function (e) {
        stringToAdd = ""
        if (e.which == 13) {
            var command = $(this).val().trim().toLowerCase().replace(/\s+/g, ' ')
            splitCommand = command.split(" ")
            $(this).parent().removeClass("inner")
            var cmd_result = await handleCommand(command) 
            if (cmd_result == false) {
                stringToAdd += `<span>ERR: Invalid operation. "${$(this).val()}" is not recognized as an internal or </br>external command, operable program or batch file.<span/></br></br>`
            }
            $(this).off("input", listener)
            $(this).prop("disabled", true)
            stringToAdd += `<div class="line-cmd">C:&#92Windows&#92System32>
            <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
            $(".prompt-body").append(stringToAdd)
            $(".input-enter").on("input", listener)
            $(".input-enter").focus()
            prevLen = 0
            count = 0
            lenStack = [0]
        }
    }

    var event = false

    function listenButton(e) {
        if (searchTerms.length === 0) {
            alert("You must select a hashing algorithm using the terminal above.")
            return
        } else if (event === false) {
            // $(".prompt-body").off("keypress", "input", inputListener)
            // $(".input-enter").off("input", listener)
            // $(".input-enter").prop("disabled", true)
            $(".step-3").addClass("step-3-show")
            $(".arrow-up").addClass("arrUp")
            $(".arrow-up").addClass("arrUp")
            $(".bridge3").addClass("bridge3a")
            $("#final-msg").addClass("shower wrapper8")
            $(".eop").addClass("shower")
            event = true
        }
    }

    $("#cmd-btn").on("click", listenButton)

    $(".prompt-body").on("keypress", "input", inputListener)

    $(".input-enter").on("input", listener)
})  