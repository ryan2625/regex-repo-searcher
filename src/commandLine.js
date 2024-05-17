/*
TODO 

On enter in CMD, remove the blinking cursor on $(this), 
make sure input is disabled, add event listener for 
the new input dynamically created )$.input-enter . on("input") etc

set the new
*/

$(document).ready(function () {

    console.log("LOADED")

    var prevLen = 0
    var count = 0
    var lenStack = [0]
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

    var searchTerms = []

    $(".prompt-body").on("keypress", "input", function (e) {
        if (e.which == 13) {
            var command = $(this).val().trim().toLowerCase().replace(/\s+/g, ' ')
            splitCommand = command.split(" ")
            $(this).parent().removeClass("inner")
            if ((command.substring(0, 7) == "op add ") && splitCommand.length == 3) {
                if (searchTerms.indexOf(splitCommand[2]) === -1) {
                    html = `<span>Added "${splitCommand[2]}" to list of search terms.<span/></br></br>
                    <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                    <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
                    $(".prompt-body").append(html)
                    searchTerms.push(splitCommand[2])
                } else {
                    html = `<span>ERR: "${splitCommand[2]}" is already in your list.<span/></br></br>
                    <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                    <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
                    $(".prompt-body").append(html)
                }
            }
            else if ((command.substring(0, 10) == "op delete ") && splitCommand.length == 3) {
                html = `<span>Removed "${splitCommand[2]}" from list of search terms.<span/></br></br>
                        <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                        <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
                $(".prompt-body").append(html)
            }
            else if ((command.substring(0, 11) == "op replace ") && splitCommand.length == 4) {
                html = `<span>Replaced "${splitCommand[2]}" with "${splitCommand[3]}".<span/></br></br>
                        <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                        <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
                $(".prompt-body").append(html)
            }
            else if ((command.substring(0, 8) == "op list ") && splitCommand.length == 2) {
                html = `<span>"${$(this).val()}" command successful. Lovely.<span/></br></br>
                        <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                        <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
                $(".prompt-body").append(html)
            }
            else {
                html = `<span>ERR: Invalid operation. ${$(this).val()} is not recognized as an internal or </br>external command,
                operable program or batch file.<span/></br></br>
                        <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                        <div class="inner"><input type="text" name="" autocomplete="off"  class="input-enter" maxlength="32"/></div>`
                $(".prompt-body").append(html)
            }
            prevLen = 0
            count = 0
            lenStack = [0]
            $(this).off("input", listener)
            $(this).prop("disabled", true)
            $(".input-enter").on("input", listener)
            $(".input-enter").focus()
        }
    })


    $(".input-enter").on("input", listener)

})