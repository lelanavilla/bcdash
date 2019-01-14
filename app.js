
$(function () {

    'use strict';
  
    (function () {
  
      var aside = $('.side-nav'),
  
          showAsideBtn = $('.show-side-btn'),
  
          contents = $('#contents');
  
      showAsideBtn.on("click", function () {
  
        $("#" + $(this).data('show')).toggleClass('show-side-nav');
  
        contents.toggleClass('margin');
  
      });
  
      if ($(window).width() <= 767) {
  
        aside.addClass('show-side-nav');
  
      }
      $(window).on('resize', function () {
  
        if ($(window).width() > 767) {
  
          aside.removeClass('show-side-nav');
  
        }
  
      });
  
      // dropdown menu in the side nav
      var slideNavDropdown = $('.side-nav-dropdown');
  
      $('.side-nav .categories li').on('click', function () {
  
        $(this).toggleClass('opend').siblings().removeClass('opend');
  
        if ($(this).hasClass('opend')) {
  
          $(this).find('.side-nav-dropdown').slideToggle('fast');
  
          $(this).siblings().find('.side-nav-dropdown').slideUp('fast');
  
        } else {
        }
      })
    })
  });

  var myCodeMirror = CodeMirror(document.body);
  var myCodeMirror = CodeMirror(document.body, {
    value: "function myScript(){return 100;}\n",
    mode:  "javascript",
    myTextArea: "TextAreaElement, ?config: object)"
  });
  var myCodeMirror = CodeMirror(function(elt) {
    myTextArea.parentNode.replaceChild(elt, myTextArea);
  }, {value: myTextArea.value});

  
  