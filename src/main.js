const svgs = [
    "./assets/SVGs/menu.svg",
    "./assets/SVGs/files.svg",
    "./assets/SVGs/source-control.svg",
    "./assets/SVGs/debug-alt.svg",
    "./assets/SVGs/extensions.svg",
]

var uploadClicked = false

$(document).ready(function () {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    $.each(svgs, function (index, val) {
        var svgDiv = $("<div>").addClass("svgCont")
        var svgImg = $("<img>").attr("src", val).addClass("svgImg")
        svgDiv.append(svgImg)
        $(".side-bar1").append(svgDiv)
    })

    $('img[src="./assets/SVGs/files.svg"]').parent().addClass("active")

    $(".svgCont").click(function () {
        let real_src = ($(this).find("img").attr("src"))
        if (real_src == "./assets/SVGs/placeholder.svg" || real_src == "./assets/SVGs/visual-studio.svg" || real_src == "./assets/SVGs/menu.svg") {
            return
        }
        $(".svgCont").removeClass("active")
        $(this).addClass("active")
    })

    $("#upload").click(function () {
        //Hide lag of loading the python scripts behind the folder upload prompt
        if (uploadClicked == false) {
            html = '<script type="py" src="./handleParse.py" config="./pyscript.json" defer></script>'
            document.body.insertAdjacentHTML("beforeend", html)
            uploadClicked = true
        }
    })

    // Display next step when user uploads file
    $("#upload").on("input", async function () {
        $(".step-1b").text("Folder Uploaded!")
        ele = $(".step2")
        ele.addClass("step-show")
        await sleep(500)
        ele = $(".bridge2")
        ele.addClass("bridge2a")
        $("#upload").off("input")
    })

    const observer1 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let element = entry.target.className.toString()
                console.log(element)
                switch (element) {
                    case "step1":
                        $(".step-1").addClass("step-vis");
                        $(".step-1a").addClass("step-vis2");
                        $(".bridge1").addClass("bridge1a")
                        $(".step-1b").addClass("step-vis3")
                        $(".cloud1").addClass("cloud1a")
                        $(".cloud2").addClass("cloud2a")
                        break
                    case "step2 step-show":
                        $(".step2-header").addClass("step-vis")
                        $(".step-2a").addClass("step-vis2");
                }
            }
        });
    }, {
        root: null,
        rootMargin: "-150px"
    });

    observer1.observe($(".step1")[0]);
    observer1.observe($(".step2")[0]);
});