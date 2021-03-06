USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching_Firm_Model]    Script Date: 9/15/2016 4:54:37 PM ******/
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

	SELECT c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForSale] c with(nolock)		
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	Where (@FirmName is NULL or @FirmName = '' or c.Firm = @FirmName)
		 and (@Model is NULL or @Model = '' or c.Model =  @Model )
		 and (c.Status = 1 and ExpiredDate >= GETDATE() )
	order by c.CreatedDate desc
END
