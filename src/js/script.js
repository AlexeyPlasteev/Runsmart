const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });
  new WOW().init();
  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });
  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });
  (function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    
      function toggleClass(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault ();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__turnover').eq(i).toggleClass('catalog-item__turnover_active');
            
          })
        });
      };
      toggleClass('.catalog-item__link');
      toggleClass('.catalog-item__back');
      
      //Modal
      
      $('[data-modal=consultation]').on ('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on ('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut ('slow');
      });
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        });
      }); 
      //form validation
      function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    //number input mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");
    });
    //sending letters
    $('form').submit (function(e) {
      e.preventDefault();
      if (!$(this).valid()) {
        return;
      }
      $.ajax ({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize ()
      }).done (function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    //scroll and pageup

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();
      }
    });

    $('a[href=#up]').on('click', function() {

      let href = $(this).attr('href');
  
      $('html, body').animate({
          scrollTop: $(href).offset().top
      });
      return false;
  });
  
  })(jQuery);
    

    