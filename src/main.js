const svgs = [
    "./assets/SVGs/menu.svg",
    "./assets/SVGs/files.svg",
    "./assets/SVGs/source-control.svg",
    "./assets/SVGs/debug-alt.svg",
    "./assets/SVGs/extensions.svg",
]

$(document).ready(function () {

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

    const observer1 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target.className.toString())
                let element = entry.target.className.toString()
                switch (element) {
                    case "step1":
                        $(".step-1").addClass("step-vis");
                        $(".step-1a").addClass("step-vis2");
                        $(".bridge1").addClass("bridge1a")
                        $(".step-1b").addClass("step-vis3")
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