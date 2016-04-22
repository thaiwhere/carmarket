USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_New_Import_Cars]    Script Date: 4/22/2016 2:52:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec get_NewCar '76','4',0,0,0,0
CREATE PROCEDURE [dbo].[get_Import_Domestic_Cars]		 
	 @IsImport bit,	 
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 100
AS
BEGIN

	SET NOCOUNT ON;

	SELECT distinct c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], f.Name as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.Name ContactName, u.Tel1 as ContactTel
	from [dbo].[CarForSale] c with(nolock)
	INNER join Firm f with (nolock) on c.FirmId = f.FirmId
	inner join Model m with (nolock) on f.FirmId = m.FirmID
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u  with(nolock) on u.UserId = c.UserId
	Where (c.IsImport =@IsImport )					
	
END
