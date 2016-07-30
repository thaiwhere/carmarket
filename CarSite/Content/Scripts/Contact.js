$(document).ready(function () {
    var frm = $('#contactForm');
    frm.bootstrapValidator({
        fields: {
            Name: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Họ và tên'
                    }
                }
            },
            Email: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Email'
                    },
                    emailAddress: {
                        message: 'Email không hợp lệ'
                    }
                }
            },
            Message: {
                validators: {
                    notEmpty: {
                        message: 'Vui lòng nhập nội dung cần liên hệ'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();
        //$('#contactForm').hide();
        //$('#status').html("Sending form, please wait...");
        //$('#status').html("Thank you, we've received your message.");
    });

    function checkValid() {
        var isValid = true;

        if ($("#Name").val() == ""){
            $("#Name").addClass("has-error");
            isValid = false;
        }

        if ($("#Email").val() == "") {
            $("#Email").addClass("has-error");
            isValid = false;
        }

        if ($("#Message").val() == "") {
            $("#Message").addClass("has-error");
            isValid = false;
        }

        return isValid;
    }

    $("#sendEmail").click(function () {

        if (checkValid() == true) {

            $('#status').html("Đang gửi, vui lòng chờ ...");

            $.ajax({
                type: "POST",
                url: "/home/SendMessage",
                data: JSON.stringify({ Name: $("#Name").val(), Email: $("#Email").val(), Phone: $("#Phone").val(), Message: $("#Message").val() }),
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true,
                success: function (result) {
                    $('#contactForm').hide();
                    $('#status').html("<br>Xin cảm ơn! . Chúng tôi đã nhận thông điệp từ Quí khách và sẽ phản hồi sớm nhất !");
                }
            });
        }
    });

});

