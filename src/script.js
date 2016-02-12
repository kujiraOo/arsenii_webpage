$(document).ready(function(){
 
    function smk_jump_to_it( _selector, _speed ){
        
        _speed = parseInt(_speed, 10) === _speed ? _speed : 300;
 
        $( _selector ).on('click', function(event){
            event.preventDefault();
            var url = $(this).attr('href'); //cache the url.
 
            // Animate the jump
            $("html, body").animate({ 
                scrollTop: parseInt( $(url).offset().top ) - 50
            }, _speed);

            hideSideMenu();
 
        });
    }

    smk_jump_to_it( '.link_classname', 500);

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('w3-red');
            $(formMessages).addClass('w3-light-blue w3-text-white');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');

            console.log(response)
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('w3-light-blue w3-text-white');
            $(formMessages).addClass('w3-red');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('an error occured and your message could not be sent');
            }
            console.log(data)
        });

    });
});

function toggleSideMenu() {
    var sideMenu = $(".w3-sidenav")[0]

    if (sideMenu.style.display == "none")
    	sideMenu.style.display = "block";
    else
    	sideMenu.style.display = "none";
}

function hideSideMenu()
{
	$(".w3-sidenav")[0].style.display = "none";
}

