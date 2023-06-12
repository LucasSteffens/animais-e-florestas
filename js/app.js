var classActive = 'active';

$('.tab-menu a').first().addClass(classActive);
$('.item').first().addClass(classActive);

$('.tab-menu a').click(function(e){
    e.preventDefault();
    var itemId = $(this).attr('href');

    $('.tab-menu a, .item').removeClass(classActive);
    $(this).addClass(classActive);
    $(itemId).addClass(classActive);
});