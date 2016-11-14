USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_New_Import_Cars]    Script Date: 4/22/2016 2:52:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec get_NewCar '76','4',0,0,0,0
ALTER PROCEDURE [dbo].[get_Import_Domestic_Cars]		 
	 @IsImport bit,	 
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 100
AS
BEGIN

	SET NOCOUNT ON;

	SELECT c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForSale] c with(nolock)	
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u  with(nolock) on u.UserId = c.UserId
	Where c.IsImport =@IsImport and c.Status = 1 and ExpiredDate >= GETDATE()
	order by c.CreatedDate desc
END
