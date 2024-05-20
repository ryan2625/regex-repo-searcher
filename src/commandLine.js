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

    function handleCommand(command) {
        splitCommand = command.split(" ")
        if ((command.substring(0, 7) == "op add ") && splitCommand.length == 3) {
            validation = true
            if (searchTerms.indexOf(splitCommand[2]) === -1) {
                stringToAdd += `<span>Added "${splitCommand[2]}" to list of search terms.<span/></br></br>`
                searchTerms.push(splitCommand[2])
            } else {
                stringToAdd += `<span>ERR: The phrase "${splitCommand[2]}" already exists your list of search terms.<span/></br></br>`
            }
            return true
        }
        else if ((command.substring(0, 10) == "op delete ") && splitCommand.length == 3) {
            if (searchTerms.indexOf(splitCommand[2]) === -1) {
                stringToAdd += `<span>ERR: The phrase "${splitCommand[2]}" does not exist in your list of search terms.<span/></br></br>`
            } else {
                stringToAdd += `<span>Removed "${splitCommand[2]}" from list of search terms.<span/></br></br>`
                searchTerms = searchTerms.filter(term => term !== splitCommand[2])
            }
            return true
        }
        else if ((command.substring(0, 11) == "op replace ") && splitCommand.length == 4) {
            if ((searchTerms.indexOf(splitCommand[2]) === -1)) {
                stringToAdd += `<span>ERR: The phrase "${splitCommand[2]}" does not exist in your list of search terms.<span/></br></br>`
                return true
            } else if (searchTerms.indexOf(splitCommand[3]) !== -1) {
                stringToAdd += `<span>ERR: The phrase "${splitCommand[3]}" already exists in your list of search terms.<span/></br></br>`
            } else {
                searchTerms[searchTerms.indexOf(splitCommand[2])] = splitCommand[3]
                stringToAdd += `<span>Replaced "${splitCommand[2]}" with "${splitCommand[3]}".<span/></br></br>`
            }

            return true
        }
        else if ((command.substring(0, 7) == "op list") && splitCommand.length == 2) {
            if (searchTerms.length === 0) {
                stringToAdd += "Your search term list is empty.</br></br>"
            } else {
                stringToAdd += "Your search term list:</br>"
                for (term in searchTerms) {
                    stringToAdd += `${searchTerms[term]} </br>`
                }
                stringToAdd += "</br>"
            }
            return true
        }
        else {
            return false
        }
    }

    $(".prompt-body").on("keypress", "input", function (e) {
        stringToAdd = ""
        if (e.which == 13) {
            var command = $(this).val().trim().toLowerCase().replace(/\s+/g, ' ')
            splitCommand = command.split(" ")
            $(this).parent().removeClass("inner")
            if (!(handleCommand(command))) {
                stringToAdd += `<span>ERR: Invalid operation. "${$(this).val()}" is not recognized as an internal or </br>external command, operable program or batch file.<span/></br></br>`
            }

            $(this).off("input", listener)
            $(this).prop("disabled", true)
            stringToAdd += `<div class="line-cmd">C:&#92Windows&#92system32>ENTER COMMAND:
            <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
            $(".prompt-body").append(stringToAdd)
            $(".input-enter").on("input", listener)
            $(".input-enter").focus()
            prevLen = 0
            count = 0
            lenStack = [0]
        }
    })

    $(".input-enter").on("input", listener)

})  