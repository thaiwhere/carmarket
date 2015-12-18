$("#menu li").click(
        function()
        {
            $("#menu li").removeClass("active");
            $(this).addClass("active");
        }
    )