$(document).ready(function () {    
    var frm = $('#manageAccountForm');
    frm.bootstrapValidator({
        fields: {           
            OldPassword: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Mật khẩu để thay đổi thông tin'
                    },
                    stringLength: {
                        min: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự'                        
                    },
                    callback: {
                        message: "Mật khẩu không đúng. Vui lòng thử lại."
                    }
                }
            },
            NewPassword: {
                validators: {
                    stringLength: {
                        min: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    }
                }
            },
            ConfirmNewPassword: {
                validators: {                    
                    identical: {
                        field: 'NewPassword',
                        message: 'Mật khẩu mới và xác nhận Mật khẩu mới không khớp'
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
       

        if ($("#NewPassword").val() == "" && $("#Tel").val() == "" && $("#Email").val() == "" && $("#Address").val() == "")
        {            
            alert("Vui lòng chọn thông tin cần thay đổi");
            $("#NewPassword").focus();
            return;
        }

        var userInfo = {           
            OldPassword: $("#OldPassword").val(),
            NewPassword: $("#NewPassword").val(),
            Tel: $("#Tel").val(),
            Email: $("#Email").val(),
            Address: $("#Address").val()
        };

        var token = $('[name=__RequestVerificationToken]').val();

        $.ajax({
            type: "POST",
            url: "/account/manage",
            data: JSON.stringify(userInfo),
            contentType: "application/json; charset=utf-8",
            cache: false,
            headers: { '__RequestVerificationToken': token },
            async: true,
            dataType: 'JSON',
            //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (result) {
                if (result.userId > 0) {
                    alert('Cập nhật thông tin thành công');

                    if (result.returnUrl != "") {
                        location.href = result.returnUrl;
                    }
                    else {
                        location.href = "/home/index";
                    }
                }
                else if (result.userId == 0) {
                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');
                    bv.updateStatus('OldPassword', 'INVALID', 'callback');
                }
                else {
                    alert('Lỗi cập nhật. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
                }
            },
            error: function (x, h, r) {
                //common.HandleAjaxError(xhr);
                alert('Lỗi cập nhật. Vui lòng thử lại hoặc Liên hệ với chúng tôi');
            }
        });
    });

});



