const svgs = [
    "./assets/SVGs/menu.svg",
    "./assets/SVGs/files.svg",
    "./assets/SVGs/source-control.svg",
    "./assets/SVGs/debug-alt.svg",
    "./assets/SVGs/extensions.svg",
]

uploadClicked = false

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
        //Hide the lag of loading the python scripts behind the folder upload prompt
        if (uploadClicked == false) {
            html = '<script type="py" src="./handleParse.py" config="./pyscript.json" defer></script>'
            document.body.insertAdjacentHTML("beforeend", html)
            uploadClicked = true
        }
    })

    $("#upload").on("input", async function () {
        document.querySelector(".step-1b").innerText= "Folder Uploaded!"
        ele = document.querySelector(".step2")
        ele.classList.add("step-show")
        await sleep(500)
        ele = document.querySelector(".bridge2")
        ele.classList.add("bridge2a")
        $("#upload").off("input")
    })

    const observer1 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let element = entry.target.className.toString()
                switch (element) {
                    case "step1":
                        $(".step-1").addClass("step-vis");
                        $(".step-1a").addClass("step-vis2");
                        $(".bridge1").addClass("bridge1a")
                        $(".step-1b").addClass("step-vis3")
                        $(".cloud1").addClass("cloud1a")
                        $(".cloud2").addClass("cloud2a")
                        break
                }
            }
        });
    }, {
        root: null,
        rootMargin: "-150px"
    });

    observer1.observe($(".step1")[0]);
});