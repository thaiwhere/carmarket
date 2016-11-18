$(document).ready(function () {   
    var frm = $('#registerForm');
    frm.bootstrapValidator({
        fields: {
            UserName: {
                validators: {
                    notEmpty: {
                        message: 'Tên đăng nhập không dấu và khoảng trắng'
                    },
                    callback: {
                        message: "Tên truy cập đã tồn tại, vui lòng chọn tên khác."
                    }
                }
            },
            Password: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Mật khẩu'
                    },
                    stringLength: {
                        min: 6,                        
                        message: "Mật khẩu phải có ít nhất 6 ký tự"
                    }
                }
            },            
            ConfirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'Nhập xác nhận Mật khẩu'
                    },
                    identical: {
                        field: 'Password',
                        message: 'Mật khẩu và xác nhận Mật khẩu không khớp'
                    }
                }
            }
            ,
            Tel: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Số điện thoại'
                    },
                    stringLength: {
                        min: 10,
                        message: "Số điện thoại phải có ít nhất 10 ký tự"
                    }
                }
            },
            Email: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Email'
                    },
                    emailAddress: {
                        message: "Email không hợp lệ"
                    }
                }
            },
            Agree: {                
                validators: {
                    notEmpty: {
                        message: '(Vui lòng check vào bạn đã đọc các điều khoản)'
                    }
                }
            }

        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();        

        var userInfo = {
            UserName: $("#UserName").val().trim(),
            Password: $("#Password").val(),
            ConfirmPassword: $("#ConfirmPassword").val(),
            Tel: $("#Tel").val(),
            Email: $("#Email").val(),
            Address: $("#Address").val(),
            returnURL: $("#returnURLId").data("value"),
            encodedResponse: $("#g-recaptcha-response").val()
        };

        var token = $('[name=__RequestVerificationToken]').val();

        $("#status").show();
        $('#status').html("Đang xử lý, vui lòng chờ ...");
        $(":button").prop('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "/account/register",
            data: JSON.stringify(userInfo),
            contentType: "application/json; charset=utf-8",
            cache: false,
            headers: { '__RequestVerificationToken': token },
            async: true,
            dataType: 'JSON',
            //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (result) {

                $(":button").prop('disabled', '');

                if (result.userId > 0) {                    
                    $('#status').html('Đăng ký thành công tài khoản ' + $("#UserName").val());

                    setTimeout(function () { 
                        if (result.returnUrl != "") {
                            location.href = result.returnUrl;
                        }
                        else {
                            location.href = "/car/yours";
                        }
                    }, 3000);
                }
                else if (result.userId == 0) {

                    $("#status").hide();

                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');
                    bv.updateStatus('UserName', 'INVALID', 'callback');
                }
                else if (result.userId == -2) {
                    console.log(result.userId);
                    $('#status').html('Sai Captcha. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
                    grecaptcha.reset();
                }
            },
            error: function (x, h, r) {
                //common.HandleAjaxError(xhr);
                $('#status').html('Lỗi đăng ký. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
                $(":button").prop('disabled', '');
            }
        });
    });   
});



