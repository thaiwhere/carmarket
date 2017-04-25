USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching_Like_toPrice_fromPrice]    Script Date: 11/14/2016 12:55:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec Car_Searching_Like_toPrice_fromPrice 285,315,0,20
ALTER PROCEDURE [dbo].[Car_Searching_Like_toPrice_fromPrice]
	 @Price money ,
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 20
AS
BEGIN

	SET NOCOUNT ON;

	SELECT top 100 c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForSale] c with(nolock)	
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	Where  c.Status = 1 and c.CurrencyVN = @Price and ExpiredDate >= GETDATE()
	order by c.CreatedDate desc
END

