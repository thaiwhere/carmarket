USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching_Firm_Model]    Script Date: 5/16/2016 2:01:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Car_Searching_Firm_Model]	
	 @FirmName varchar(100),	 
	 @Model varchar(300),	
     @currentPageIndex int = 0,
     @ItemsPerPage int = 20
AS
BEGIN

	SET NOCOUNT ON;

	SELECT distinct c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], f.Name as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.Name ContactName, u.Tel1 as ContactTel
	from [dbo].[CarForSale] c with(nolock)
	INNER join Firm f with (nolock) on c.FirmId = f.FirmId
	inner join Model m with (nolock) on f.FirmId = m.FirmID
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	Where (@FirmName is NULL or @FirmName = '' or f.Name = @FirmName)
		 and (@Model is NULL or @Model = '' or m.Name =  @Model )
	
END
