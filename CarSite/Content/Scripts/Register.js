$(document).ready(function () {
    var frm = $('#registerForm');
    frm.bootstrapValidator({
        fields: {
            UserName: {
                validators: {
                    notEmpty: {
                        message: 'Nhập Họ và tên'
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
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();        
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

        if ($("#ConfirmPassword").val() == "") {
            $("#ConfirmPassword").addClass("has-error");
            isValid = false;
        }

        return isValid;
    };

    $("#Register").click(function () {

        if (checkRegisterValid() == true) {            
            
            function addRequestVerificationToken(data) {
                data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                return data;
            };

            $.ajax({
                type: "POST",
                url: "/account/Register",
                //data: addRequestVerificationToken({ model: JSON.stringify({ UserName: $("#UserName").val(), Password: $("#Password").val(), ConfirmPassword: $("#ConfirmPassword").val(), Tel: $("#Tel").val(), Email: $("#Email").val() }) }),
                data: JSON.stringify({ UserName: $("#UserName").val(), Password: $("#Password").val(), ConfirmPassword: $("#ConfirmPassword").val(), Tel: $("#Tel").val(), Email: $("#Email").val() }),
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true,
                success: function (result) {                  
                },
                error: function (xhr) {                    
                    //common.HandleAjaxError(xhr);
                }
            });
        }
    });

});



