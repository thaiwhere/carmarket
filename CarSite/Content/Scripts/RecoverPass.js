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
            Email: {
                validators: {
                    emailAddress: {
                        message: "Email không hợp lệ"
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();

        var userInfo = {
            UserName: $("#UserName").val(),            
            returnURL: $("#returnURLId").data("value")
        };

        var token = $('[name=__RequestVerificationToken]').val();

        $.ajax({
            type: "POST",
            url: "/account/recoverpass",
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
                alert('Lỗi đăng nhập. 5Vui lòng thử lại hoặc Liên hệ với chúng tôi');
            }
        });
    });
});



