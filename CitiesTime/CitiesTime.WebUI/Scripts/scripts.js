$(document).ready(function () {
    $('#main').css('visibility', 'hidden');
    $('#cities').on('change', function () {
        if ($(this).val() == "-1") {
            $('#main').css('visibility', 'hidden');
        }
        else {
            $.ajax({
                url: "/City/GetLocalTime/" + $(this).val(),
                success: function (result) {
                    $('#main').css('visibility', 'visible');
                    $('#date').html(result.Date);
                    $('#hour').html(result.Hour);
                },
                error: function (data) {
                    $('#error').html(data);
                }
            })
        }
    });
    $('#validate').on('click', function () {
        //Build the object to send it in the ajax call
        var address = {
            "Consignee": "",
            "Address": {
                "BuildingName": null,
                "StreetAddress": "",
                "Suburb": $("#sub").val(),
                "City": $("#city").val(),
                "PostCode": $("#zip").val(),
                "CountryCode": ""
            },
            "Email": null,
            "ContactPerson": null,
            "PhoneNumber": null,
            "IsRural": false,
            "DeliveryInstructions": null
        }
        var key = 'ADBD5C9BDFB0BE6C6D7810735AC79F300EA2231A2CFDF350D4';
        var api_url = 'http://api.gosweetspot.com/v2/addressvalidation';
        $.ajax({
            url: api_url,
            dataType: 'json',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('access_key', key);
            },
            data: '',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            success: function (result) {
                var text = "";
                if (result.validated) {
                    text = "The address was validated corrected.";
                }
                else {
                    text = "The address is not valid. Try again.";
                }
                $('#result').html(text);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#error').text(jqXHR.responseText || textStatus);
            }
        });
    });

});