/*
TODO 

On enter in CMD, remove the blinking cursor on $(this), 
make sure input is disabled, add event listener for 
the new input dynamically created )$.input-enter . on("input") etc

set the new
*/

$(document).ready(function () {

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
    line up, add an extra pixel every 3 iterations and change the
    width of the parent div instead of the input directly. 
    */
   var listener =  function (e) {
        console.log("ASD")
        // Detect if user is deleting or adding character to input
        if ($(this).val().length > prevLen) {
            if (count % 3 == 0) {
                lenStack.push(8)
            }
            else {
                lenStack.push(7)
            }
        } else {
            lenStack.pop()
        }
        $(".inner").css('width', (lenStack.reduce((total, currVal) => total + currVal)))
        count += 1
        prevLen = $(this).val().length
    }

    $(".prompt-body").on("keypress", "input", function (e) {
        if (e.which == 13) {
            var command = $(this).val().trim().toLowerCase().replace(/\s+/g, ' ')
            if (((command.substring(0, 7) == "op add " ||
                command.substring(0, 10) == "op delete " ||
                command.substring(0, 8) == "op list ") && command.split(" ").length == 3)
                ||
                ((command.substring(0, 11) == "op replace ") && command.split(" ").length == 4)) {
                    $(this).parent().removeClass("inner")
                    html = `<span>${$(this).val()} command successful.<span/></br></br>
                            <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                            <div class="inner"><input type="text" name="" id="cmd-input" autocomplete="off"  class="input-enter"></div>`
                    $(".prompt-body").append(html)
            } else {
                $(this).parent().removeClass("inner")
                html = `<span>${$(this).val()} is not a valid command.<span/></br></br>
                        <div class="line-cmd">C:\WINDOWS\system32>ENTER COMMAND:
                        <div class="inner"><input type="text" name="" id="cmd-input" autocomplete="off"  class="input-enter"></div>`
                $(".prompt-body").append(html)
            }
            prevLen = 0
            count = 0
            lenStack = [0]            
            $(this).off("input", listener)
            $(".input-enter").on("input", listener)
            $(this).prop("disabled", true)
        }
    })

    $(".input-enter").on("input", listener)

})