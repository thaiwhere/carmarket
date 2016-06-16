USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching_Firm_Model]    Script Date: 6/15/2016 8:41:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Car_Searching_Firm_Model_Province]	
	 @FirmName varchar(100),	 
	 @Model varchar(300),	
	 @Province varchar(30),
     @currentPageIndex int = 0,
     @ItemsPerPage int = 20
AS
BEGIN

	SET NOCOUNT ON;

	SELECT distinct c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.Name ContactName, u.Tel1 as ContactTel
	from [dbo].[CarForSale] c with(nolock)		
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	Where (@FirmName is NULL or @FirmName = '' or c.Firm = @FirmName)
		 and (@Model is NULL or @Model = '' or c.Model =  @Model )
		 and (@Province is NULL or @Province = '' or p.Name =  @Province )
	
END
