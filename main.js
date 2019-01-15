const offset = 85;

$('.navbar li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView({behavior: "smooth", block: 'start'});
     
});

const selfie = document.getElementById('selfie')
selfie.onmouseover = function(){
    this.src = "img/selfie.jpg"
}
selfie.onmouseout = function(){
    this.src = "img/selfie2.jpeg"
}