using System.ComponentModel.DataAnnotations;

namespace CarSite.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
    }

    public class ManageUserViewModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mật khẩu cũ không để trống.")]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu cũ")]
        public string OldPassword { get; set; }

        //[Required(AllowEmptyStrings = false, ErrorMessage = "Mật khẩu mới không để trống.")]
        //[StringLength(100, ErrorMessage = "{0} phải có ít nhất {2} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu mới")]
        public string NewPassword { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Xác nhận Mật khẩu mới")]
        //[System.Web.Mvc.Compare("NewPassword", ErrorMessage = "Mật khẩu và Xác nhận mật khẩu không khớp.")]        
        //public string ConfirmPassword { get; set; }

        [Display(Name = "Điện thoại")]
        public string Tel { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Tên đăng nhập")]                
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {        
        [Display(Name = "Tên đăng nhập")]
        public string UserName { get; set; }
           
        [StringLength(100, ErrorMessage = "{0} phải có ít nhất {2} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Xác nhận Mật khẩu")]
        [System.Web.Mvc.Compare("Password", ErrorMessage = "Mật khẩu và Xác nhận mật khẩu không khớp.")]        
        public string ConfirmPassword { get; set; }
        
        [Display(Name = "Điện thoại")]
        public string Tel { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
