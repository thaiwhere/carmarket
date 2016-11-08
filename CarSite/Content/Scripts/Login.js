$(document).ready(function () {
    var frm = $('#loginForm');
    frm.bootstrapValidator({
        fields: {
            UserName: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Tên đăng nhập'
                    },
                    callback: {
                        message: "Tên đăng nhập"
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
                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    },
                    callback: {
                        message: "hoặc Mật khẩu không chính xác."
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();

        var userInfo = {
            UserName: $("#UserName").val(),
            Password: $("#Password").val(),
            RememberMe: $("#RememberMe").val(),
            returnURL: $("#returnURLId").data("value"),
            encodedResponse: $("#g-recaptcha-response").val()
        };

        var token = $('[name=__RequestVerificationToken]').val();

        $("#status").show();
        $('#status').html("Đang xử lý, vui lòng chờ ...");
        $(":button").prop('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "/account/login",
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
                    if (result.returnUrl != "") {
                        location.href = result.returnUrl;
                    }
                    else {
                        location.href = "/car/yours";
                    }
                }
                else if (result.userId == -2) {                 
                    $('#status').html('Sai Captcha. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
                }
                else {
                    $("#status").hide();

                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');
                    bv.updateStatus('UserName', 'INVALID', 'callback');
                    bv.updateStatus('Password', 'INVALID', 'callback');
                    $("#UserName").focus();
                }
            },
            error: function (x, h, r) {
                //common.HandleAjaxError(xhr);
                $('#status').html('Lỗi đăng nhập. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
                $(":button").prop('disabled', '');
            }
        });
    });
});



