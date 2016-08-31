$(document).ready(function () {
    var count = 0;
    var frm = $('#recoverPassForm');
    frm.bootstrapValidator({
        fields: {
            UserName: {
                validators: {
                    //notEmpty: {
                    //    message: 'Nhập Tên đăng nhập hoặc Email'
                    //},
                    callback: {
                        message: 'Tên đăng nhập không tồn tại'
                    }
                }
            },
            Email: {
                validators: {
                    emailAddress: {
                        message: "Email không hợp lệ"
                    },
                    callback: {
                        message: 'Email không tồn tại'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();

        if (count == 1) { return; }
        count++;

        var userInfo = {
            UserName: $("#UserName").val(),
            Email: $("#Email").val(),
            returnURL: $("#returnURLId").data("value")
        };

        if (userInfo.UserName == "" && userInfo.Email == "") {
            $("#error").show();
            $("#UserName").focus();
            return;
        }        
        
        var token = $('[name=__RequestVerificationToken]').val();

        $.ajax({
            type: "POST",
            url: "/account/RecoverPass",
            data: JSON.stringify(userInfo),
            contentType: "application/json; charset=utf-8",
            cache: false,
            headers: { '__RequestVerificationToken': token },
            async: true,
            dataType: 'JSON',
            //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (result) {
                if (result.userId > 0) {

                    alert("Mật khẩu đã đuợc gửi đến email: " + result.email);

                    if (result.returnUrl != "") {
                        location.href = result.returnUrl;
                    }                    
                }
                else {
                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');

                    if (userInfo.UserName != "") {
                        bv.updateStatus('UserName', 'INVALID', 'callback');
                    }
                    if (userInfo.Email != "") {
                        bv.updateStatus('Email', 'INVALID', 'callback');
                    }
                }
            },
            error: function (x, h, r) {
                //common.HandleAjaxError(xhr);
                alert('Lỗi phục hồi Mật khẩu. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
            }
        });
    });
});



