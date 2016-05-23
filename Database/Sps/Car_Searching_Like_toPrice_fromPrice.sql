--exec Car_Searching_Like_toPrice_fromPrice 285,315,0,20
CREATE PROCEDURE [dbo].Car_Searching_Like_toPrice_fromPrice
	 @Price money ,
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 20
AS
BEGIN

	SET NOCOUNT ON;

	SELECT distinct c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.Name ContactName, u.Tel1 as ContactTel
	from [dbo].[CarForSale] c with(nolock)	
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	Where  c.CurrencyVN = @Price
	
END

