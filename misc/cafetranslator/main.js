let data;
let textArr;
let emptyData = {}

$(function() {
    $('#submit').on('click', submit)
    
})

function submit() {
    let html = ``
    data = JSON.parse($('#json').val())
    let cmdName = Object.keys(data)[0]
    textArr = data[cmdName]
    
    console.log(data)
    html += `${cmdName}<br><input type="text" id="cmdname"><br>`
    for(var i in textArr) {
        html += `${textArr[i]}<br><input type="text" id="${i}"><br>`
    }
    html += `<input type="button" id="finish" value="finish">`
    $('#main').html(html)
    $('#finish').on('click', finish)
}

function finish() {
    console.log('hoi')
    let cmdNametrans = $('#cmdname').val()
    emptyData[cmdNametrans] = []
    for(var i in textArr) {
        emptyData[cmdNametrans].push($(`#${i}`).val())
    }
    let json = JSON.stringify(emptyData)
    console.log(json)
    $('#main').html(json)
}