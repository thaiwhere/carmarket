USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_YourCars]    Script Date: 11/18/2016 9:54:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--exec get_YourCars 1012

ALTER PROCEDURE [dbo].[get_YourCars]
	 @UserId int,	 
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 100
AS
BEGIN

	SET NOCOUNT ON;

	IF(@UserId = 7)--admin
	BEGIN
		SELECT distinct c.CarId, u.UserId, u.UserName, u.Email, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, 0 as IsBuy, c.Status, FORMAT(ISNULL(c.ModifiedDate, c.CreatedDate), 'dd/MM/yyyy')  as ModifiedDate, c.CountVisit
		from [dbo].[CarForSale] c with(nolock)	
		inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
		left join [User] u  with(nolock) on u.UserId = c.UserId
		Where ExpiredDate >= GETDATE()

		UNION

		SELECT distinct b.CarId, u.UserId, u.UserName, u.Email, b.IsNew, b.IsImport, b.[year], b.Firm as FirmName, b.Title, 1 as IsBuy, b.Status, FORMAT(ISNULL(b.ModifiedDate, b.CreatedDate), 'dd/MM/yyyy') as ModifiedDate , b.CountVisit
		from [dbo].[CarForBuy] b with(nolock)	
		left join Province p with(nolock) on p.ProvinceId = b.ProvinceId
		left join [User] u  with(nolock) on u.UserId = b.UserId
		Where ExpiredDate >= GETDATE()
	END
	ELSE
	BEGIN

		SELECT distinct c.CarId, u.UserId, u.UserName, u.Email,  c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, 0 as IsBuy, c.Status, FORMAT(ISNULL(c.ModifiedDate, c.CreatedDate), 'dd/MM/yyyy')  as ModifiedDate, c.CountVisit
		from [dbo].[CarForSale] c with(nolock)	
		inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
		inner join [User] u  with(nolock) on u.UserId = c.UserId
		Where c.UserId = @UserId and ExpiredDate >= GETDATE()

		UNION

		SELECT distinct b.CarId, u.UserId, u.UserName, u.Email, b.IsNew, b.IsImport, b.[year], b.Firm as FirmName, b.Title, 1 as IsBuy, b.Status, FORMAT(ISNULL(b.ModifiedDate, b.CreatedDate), 'dd/MM/yyyy') as ModifiedDate , b.CountVisit
		from [dbo].[CarForBuy] b with(nolock)	
		left join Province p with(nolock) on p.ProvinceId = b.ProvinceId
		inner join [User] u  with(nolock) on u.UserId = b.UserId
		Where b.UserId = @UserId and ExpiredDate >= GETDATE()
	END
END
