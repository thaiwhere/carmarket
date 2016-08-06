USE [CARWEB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--exec get_YourCarsExpired 8

ALTER PROCEDURE [dbo].[get_YourCarsExpired]
	 @UserId int,	 
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 100
AS
BEGIN

	SET NOCOUNT ON;

	SELECT distinct c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, 0  as IsBuy
	from [dbo].[CarForSale] c with(nolock)	
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u  with(nolock) on u.UserId = c.UserId
	Where c.UserId = @UserId and ExpiredDate < GETDATE()

	UNION

	SELECT distinct b.CarId, u.UserId, b.IsNew, b.IsImport, b.[year], b.Firm as FirmName, b.Title, b.[Description], b.Km, b.GearBox, b.[PriceFromVN] as CurrencyVN , p.Name as Province, u.UserName ContactName, 1 as IsBuy
	from [dbo].[CarForBuy] b with(nolock)	
	left join Province p with(nolock) on p.ProvinceId = b.ProvinceId
	inner join [User] u  with(nolock) on u.UserId = b.UserId
	Where b.UserId = @UserId and ExpiredDate < GETDATE()
	
END
