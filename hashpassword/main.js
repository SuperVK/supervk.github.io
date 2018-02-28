
$(document).ready(function(){
    const correctPassword = 'f740eafa53e9bc2ab9f5afb5d13c686d2476071e3e2184158485e3a9843383b8'
    $("#check").click(function(){
        
        console.log('Raw: '+$("#passwordInput").val())
        var hashPassword = SHA256($("#passwordInput").val())
        console.log('Hashed: ' + hashPassword)
        if(hashPassword == correctPassword) {
            $("#reponse").html("correct!")
        } else {
            $("#reponse").html("WRONG!")
        }
    });
});