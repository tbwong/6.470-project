$(document).ready(function(){

      $('#scrapbook_img{{forloop.counter}}').click(function(){
            $('#scrapbook-popup #scrapbook-title').html("{{x.title}}");
            $('#scrapbook-popup #scrapbook-image').attr('src','{{MEDIA_URL}}{{x.picture}}');
            $('#scrapbook-popup #scrapbook-caption').html("{{x.caption}}");      
            $('#popupBackground').fadeIn();
            $('#scrapbook-popup').show('slow');
      });

       $('#popupBackground').click(function(){
             $('#popupBackground').fadeOut();
             $('#scrapbook-popup').hide('fast');
       });

       $("#left").click(function() {
             $(this).blur();
             if(currentID > 1) {
             $('#popupBackground').fadeIn();
             $('#recipeInfo').show('slow');
             currentID = currentID - 1;
             $('.rInfo').hide();
             $('#rInfo-'+currentID).show("slide", {direction:"left"});
             }
       });

       $("#right").click(function() {
             $(this).blur();
             $('#popupBackground').fadeIn();
             $('#recipeInfo').show('slow');
             currentID = parseInt(currentID) + 1;
             $('.rInfo').hide();
             $('#rInfo-'+currentID).show("slide", {direction:"right"});
      });
          
}
                               