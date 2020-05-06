$('.showPass').on('click', function () {
    let passInput = $(this).prev();

    if($(this).hasClass('active')){
        passInput.attr("type", "password");
        $(this).removeClass('active');
    } else {
        passInput.attr("type", "text");
        $(this).addClass('active');
    }
});

$('select').change(function () {
    if($(this).val() == 'other'){
        // $(this).prev().prev().find('input[disabled]').removeAttr('disabled');
        $(this).parent().parent().find('input[disabled]').removeAttr('disabled');
    }
});

$('select.datepicker').change(function () {
    if($(this).val() == 'custom'){
        $(this).parent().find('input.date').removeAttr('disabled');
    } else {
        $(this).parent().find('input.date').attr('disabled', 'disabled')
    }
});

$('#searchButton').click(function () {
    $('#searchField').addClass('active')
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body',
        offset:  '0 50'
    });

    $('.slick-2 ').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
        draggable: false
    });

    $('.slick-4').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
        draggable: false
    });

    $('select').selectize({
        persist: false,
        create: false,
    });
    $('.selectize-input > input').prop('disabled', 'disabled');

    $('[data-toggle="datepicker"]').datepicker({
        format: 'dd/mm/yyyy',
        offset: -30
    });
});