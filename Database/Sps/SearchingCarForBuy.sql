USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching]    Script Date: 9/15/2016 4:52:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchingCarForBuy]		
     @CurrentPageIndex int = 0,
     @ItemsPerPage int = 100
AS

/*

exec [Car_Searching] '', ''
*/
BEGIN

	SET NOCOUNT ON;	

	SELECT distinct c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.PriceFromVN, c.PriceToVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForBuy] c with(nolock)		
	left join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	left join InteriorColor inter on c.InteriorColorId = inter.InteriorColorId
	left join ExteriorColor ext on c.ExteriorColorId = ext.ExteriorColorId

	Where (c.Status = 1) and ExpiredDate >= GETDATE()
			
END
