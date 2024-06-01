$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    adeptiveHeight: true,
    prevArrow:'<button type="button" class="slick-prev"><img src="img/icons/chevron-left-solid.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/icons/chevron-right-solid.png"></button>',
    responsive: [
      {
        breakpoint: 986,
        settings: {
          infinite: true,
          dots: true,
          dotsClass:'slick-dots',
          arrows: false,

        },
      },
      
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  

  function toggleSlide(item) {
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__list__back');

  //modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function()  {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  function validateForms(form){
      $(form).validate({
      rules: {
        name: "required",
        email: {
          required: true,
          email: true 
        },
        phone: "required",
      },
      messages: {
        name: {
          required: "Введіть своє ім'я",
        },
        phone: "Введіть свій номер телефону",

        email: {
          required: "Введіть свою пошту",
          email: "Ваша пошта має бути  вигляду name@domain.com",
        }
      }

    });
  };

   validateForms('#order form');
   validateForms('#consultation form');
   validateForms('#consultation-form');

   $('input[name=phone]').mask("+380(99) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');


      $('form').trigger('resset');
    });
    return false;

  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1200) {
      $('.page-up').fadeIn();
    } else {
      $('.page-up').fadeOut();
    }
  });

  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  new WOW().init();

});