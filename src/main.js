const svgs = [
     "./assets/SVGs/menu.svg",
     "./assets/SVGs/files.svg",
     "./assets/SVGs/source-control.svg",
     "./assets/SVGs/debug-alt.svg",
     "./assets/SVGs/extensions.svg",
     "./assets/SVGs/terminal-cmd.svg",
     "", 
     "", 
     "./assets/SVGs/settings-gear.svg",
     "./assets/SVGs/account.svg"
]

$(document).ready(function() {

    $.each(svgs, function(index, val) {
        var svgDiv = $("<div>").addClass("svgCont")
        var svgImg = $("<img>").attr("src", val).addClass("svgImg")
        svgDiv.append(svgImg)
        $(".sidebar-cont").append(svgDiv)
    })

    $('img[src="./assets/SVGs/files.svg"]').parent().addClass("active")

    $(".svgCont").click(function() {
        let real_src = ($(this).find("img").attr("src"))
        if (real_src == "" || real_src == "./assets/SVGs/visual-studio.svg"){ 
            return
        }
        $(".svgCont").removeClass("active")
        $(this).addClass("active")
    })

});