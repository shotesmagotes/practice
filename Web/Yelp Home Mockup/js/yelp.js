$(document).ready(function(){
    $('.star-rating-widget ul li').hover(function(){
        var stars = $(this).find('input[name="rating"]').attr('value'),
            starclass = "";
        switch (stars){
            case '1':
                starclass = "stars-1";
                break;
            case '2':
                starclass = "stars-2";
                break;
            case '3': 
                starclass = "stars-3";
                break;
            case '4':
                starclass = "stars-4";
                break;
            case '5': 
                starclass = "stars-5";
                break;
            default: 
                starclass = "";
        }
        console.log(starclass);
        $('.star-rating-widget ul').attr("class",starclass);
    }, function(){
        $('.star-rating-widget ul').attr("class","stars-0");
    });
});
