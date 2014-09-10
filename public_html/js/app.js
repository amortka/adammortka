(function($, window, document) {
    'use-strict';
    var stickyNav;
    var sections = ['about', 'skills', 'cv', 'blog', 'social', 'contact'];
    var didScroll = false;
    var teaser = $("#teaser, #nav-head");
    
    $(function() {
        $window = $(window);

        $(window).scroll(function() {
            didScroll = true;
            $('#seemore').hide();
        });
        $(window).resize(function() {
            if ($(document).width() > 991) {$('nav ul').show(); } else {
               $('nav ul').hide();
            }
        });

        window.setInterval(function() {
            if (didScroll) {
                if (1 - $(window).scrollTop() / 200 > -20) {
                    teaser.css({
                        opacity: 1 - $(window).scrollTop() / 300
                    });
                }
                didScroll = false; 
            }
        }, 50);

        $('#menu-button').click(function(e) {
                $('nav ul').slideToggle();
        });
        
        $('nav a, #seemore > p > a, #nav-head a').click(function(e) {
            e.preventDefault();
            if ($(this).attr('id')!=='menu-button' && $(this).attr('id')!=='menu-top') { 
                if ($(document).width() < 991) {
                   $('nav ul').slideUp();
                } 
            }
            $("body, html").animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 600);

        });

        function applyStickyNavigation()
        {
            stickyNav = $('nav').offset().top - 60;
            $(window).on('scroll', function() {
                setTimeout(function() { //to avoid performance decrease
                    stickyNavigation();
                    highlightNav();
                }, 200)
            });
            stickyNavigation();
        }

        function stickyNavigation()
        {
            if ($(window).scrollTop() > stickyNav)
            {
                $('body').addClass('fixed');
            }
            else
            {
                $('body').removeClass('fixed');
            }
        }

        function highlightNav() {
            sections.forEach(function(section) {
                var navItem = $('#nav-item-' + section);
                var navSection = $('#' + section);
                if (navItem.hasClass('active')) {
                    navItem.removeClass('active');
                }
                var navSectionOffsetTop = navSection.offset().top;
                var navSectionOffsetBottom = navSection.offset().top + navSection.height();
                if (get_scroll().y > navSectionOffsetTop - 20 && get_scroll().y < navSectionOffsetBottom - 20) {
                    navItem.addClass('active');
                }
            });
        }


        var get_scroll = function() {
            var x = 0, y = 0;
            if (typeof (window.pageYOffset) == 'number') {
                //Netscape compliant
                y = window.pageYOffset;
                x = window.pageXOffset;
            } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
                //DOM compliant
                y = document.body.scrollTop;
                x = document.body.scrollLeft;
            } else if (document.documentElement &&
                    (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                //IE6 standards compliant mode
                y = document.documentElement.scrollTop;
                x = document.documentElement.scrollLeft;
            }
            var obj = new Object();
            obj.x = x;
            obj.y = y;
            return obj;
        };


        applyStickyNavigation();
    });
})(window.jQuery, this, document);
