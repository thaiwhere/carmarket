$(document).ready(function () {
    var frm = $('#loginForm');
    frm.bootstrapValidator({
        fields: {
            UserName: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Tên đăng nhập'
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
                        message: "Tên đăng nhập hoặc Mật khẩu không chính xác."
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();

        if (checkRegisterValid() == true) {

            var userInfo = {
                UserName: $("#UserName").val(),
                Password: $("#Password").val(),
                RememberMe: $("#RememberMe").val(),
                returnURL: $("#returnURLId").data("value")
            };

            var token = $('[name=__RequestVerificationToken]').val();

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
                    if (result.userId > 0) {
                        if (result.returnUrl != "") {
                            location.href = result.returnUrl;
                        }
                        else {
                            location.href = "/car/insert";
                        }
                    }
                    else {
                        var $form = $(e.target);
                        var bv = $form.data('bootstrapValidator');
                        bv.updateStatus('Password', 'INVALID', 'callback');
                    }
                },
                error: function (x, h, r) {
                    //common.HandleAjaxError(xhr);
                    alert('Lỗi đăng nhập. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
                }
            });
        }
    });

    function checkRegisterValid() {
        var isValid = true;

        if ($("#UserName").val() == "") {
            $("#UserName").addClass("has-error");
            isValid = false;
        }

        if ($("#Password").val() == "") {
            $("#Password").addClass("has-error");
            isValid = false;
        }

        return isValid;
    };
});



