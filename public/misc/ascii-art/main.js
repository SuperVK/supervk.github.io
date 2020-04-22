//const gradient = ['@', '&', '$', '?', '}', ']',  '>', '/', ')', ';']
const gradient = ['@', '$', 'X', 'x', '=', '+', ';', ':', '.', ',']

$(function () {
    const grid = document.getElementById('grid')
    for (let y = 1; y < 45; y++) {
        for (let x = 1; x < 200; x++) {
            $("#grid").append(`<span id="${x},${y}" class="pixel" hidden>y</span>`)
        }
        $("#grid").append(`<br>`)
    }
    $("#submit").on('click', function () {
        let file = document.getElementById("file").files[0]
        let preview = document.getElementById("preview")
        preview.src = URL.createObjectURL(file)

        let reader = new FileReader();
        reader.onload = function (e) {
            Jimp.read(e.target.result, (err, img) => {
                img.greyscale()
                img.resize((31*2), 31)
                let innerHTML = ''
                img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {

                    var red = this.bitmap.data[idx + 0];
                    var green = this.bitmap.data[idx + 1];
                    var blue = this.bitmap.data[idx + 2];
                    var average = (red+green+blue)/3
                    innerHTML += `${gradient[Math.floor((average/256)*10)]}`
                    if(x == img.bitmap.width-1) innerHTML += '<br>'
                })
                grid.innerHTML = innerHTML
                img.getBase64(file.type, (err, base64) => {
                    //console.log(base64)
                 //   preview.src = base64
                })
            })

        };
       
        reader.readAsDataURL(file);
    })
})