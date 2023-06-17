// Debounce do Lodash
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// $(document).ready(function(){
//     var classActive = 'active';

//     $('.animais .tab-menu a').first().addClass(classActive);
//     $('.animais .item').first().addClass(classActive);
    
//     $('.animais .tab-menu a').click(function(e){
//         e.preventDefault();
//         var itemId = $(this).attr('href');
    
//         $('.animais .tab-menu a, .animais .item').removeClass(classActive);
//         $(this).addClass(classActive);
//         $(itemId).addClass(classActive);
//     });
    
//     $('.florestas .tab-menu a').first().addClass(classActive);
//     $('.florestas .item').first().addClass(classActive);
    
//     $('.florestas .tab-menu a').click(function(e){
//         e.preventDefault();
//         var itemId = $(this).attr('href');
    
//         $('.florestas .tab-menu a, .florestas .item').removeClass(classActive);
//         $(this).addClass(classActive);
//         $(itemId).addClass(classActive);
//     });
// })
// Codigo Otimizado abaixo:

// Muda tab ao Click
$('[data-group]').each(function(){
    var allTarget = $(this).find('[data-target]'),
        allClick = $(this).find('[data-click]'),
        activeClass = 'active';

    allTarget.first().addClass(activeClass);
    allClick.first().addClass(activeClass);

    allClick.click(function(e){
        e.preventDefault();

        var id = $(this).data('click'),
            target = $('[data-target="' + id + '"]');

        allClick.removeClass(activeClass);
        allTarget.removeClass(activeClass);

        target.addClass(activeClass);
        $(this).addClass(activeClass);
    });
});

// Scroll suave para link externo
$('.menu-nav a[href^="#"]').click(function(e){
    e.preventDefault();

    var id = $(this).attr('href'),
        menuHeight = $('.menu').innerHeight(),
        targetOffset = $(id).offset().top;

    
    $('html, body').animate({
        scrollTop: targetOffset - menuHeight
    },500);
});

//Scroll suave para o Topo
$('.logo').click(function(e){
    e.preventDefault();

    $('html, body').animate({
        scrollTop: 0
}, 500);
});

//Mudar para active o menu de acordo com a area
$('section').each(function(){
    var height = $(this).height(),
        offsetTop = $(this).offset().top,
        menuHeight = $('.menu').innerHeight(),
        id = $(this).attr('id'),
        itemMenu = $('a[href="#' + id + '"]');

    $(window).scroll(debounce(function(){
        var scrollTop = $(window).scrollTop();
        if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
            itemMenu.addClass('active');
        } else {
            itemMenu.removeClass('active');
        }
    }, 200));
});

//Botão menu do mobile
$('.mobile-btn').click(function(){
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('active');
});

// Slider
(function(){
function slider(sliderName) {
    var sliderClass = '.' + sliderName,
        activeClass = 'active',
        rotate = setInterval(rotateSlide, 2000);

    $(sliderClass + '> :first').addClass(activeClass);

    $(sliderClass).hover(function(){
        clearInterval(rotate);
    }, function(){
        rotate = setInterval(rotateSlide, 2000);
    });

    function rotateSlide() {
        var activeSlide = $(sliderClass + ' > .' + activeClass),
            nextSlide = activeSlide.next();

        if(nextSlide.length == 0) {
            nextSlide = $(sliderClass + ' > :first');
        }
        activeSlide.removeClass(activeClass);
        nextSlide.addClass(activeClass);
    }
}

slider('introducao');
})();

// Animação ao Scroll.
(function(){
var target = $('[data-anime="scroll"]'),
    animationClass = 'animate',
    offset = $(window).height() * 3/4;

function animeScroll() {
    var documentTop = $(window).scrollTop();
    target.each(function(){
        var itemTop = $(this).offset().top;
        if (documentTop > itemTop - offset) {
            $(this).addClass(animationClass);
        } else {
            $(this).removeClass(animationClass);
        }
    });
}

animeScroll();

$(document).scroll(debounce(function(){
    animeScroll();
}, 200));
})();
