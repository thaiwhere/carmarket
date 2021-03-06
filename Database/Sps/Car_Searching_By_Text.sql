USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching_By_Text]    Script Date: 9/15/2016 4:53:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Car_Searching_By_Text]	
	 @Text varchar(100),	 	 
     @currentPageIndex int = 0,
     @ItemsPerPage int = 20
AS
BEGIN

	SET NOCOUNT ON;

	SELECT c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForSale] c with(nolock)		
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	inner join [Fuel] f with(nolock) on f.FuelId = c.FuelId
	inner join [WheelDrive] w with(nolock) on w.WheelDriveId = c.WheelDriveId
	Where (c.Status = 1  and ExpiredDate >= GETDATE() ) and 
	(c.Title like '%' + @Text + '%'
	or c.Description like '%' + @Text + '%'
	or c.Firm like '%' + @Text + '%'
	or c.Model like '%' + @Text + '%'
	or p.Name like '%' + @Text + '%'
	or c.TypeId like '%' + @Text + '%'
	or c.FuelSystem like '%' + @Text + '%'			
	or f.Name like '%' + @Text + '%'
	or w.Name like '%' + @Text + '%')
	order by c.CreatedDate desc

END
