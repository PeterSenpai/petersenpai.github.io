// const offset = 85;

// $('.navbar li a').click(function(event) {
//     event.preventDefault();
//     $($(this).attr('href'))[0].scrollIntoView({behavior: "smooth"});
//     // scrollBy(0, -offset);

    
// });

const offset = 85;

$('.navbar li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView({behavior: "smooth", block: 'start'});
    

    
});