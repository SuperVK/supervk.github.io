$(function () {
    for (let y = 1; y < 45; y++) {
        for (let x = 1; x < 200; x++) {
            $("#grid").append(`<span id="${x},${y}" class="pixel" hidden>y</span>`)
        }
        $("#grid").append(`<br>`)
    }
    $("#submit").on('click', function () {
        var file = document.getElementById("file").files[0]
        console.log(file)
        var preview = document.getElementById("preview")
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                Jimp.read(e.target.result, (err, img) => {
                    img.greyscale()
                    img.getBase64(file.type, (base64) => {
                        console.log(base64)
                    })
                    aImg.src = img
                })

                //aImg.src = e.target.result;
                console.log(e.target.result)
            };
        })(img);
        reader.readAsDataURL(file);
    })
})