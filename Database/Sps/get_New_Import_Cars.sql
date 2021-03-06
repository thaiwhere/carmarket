USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_New_OldCar]    Script Date: 14/04/2016 4:02:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec get_NewCar '76','4',0,0,0,0
ALTER PROCEDURE [dbo].[get_New_Import_Cars]		 
	 @IsNew smallint = 0,
	 @IsImport smallint  = 0,  -- 0: All
	 @currentPageIndex int = 0,
     @ItemsPerPage int = 100
AS
BEGIN

	SET NOCOUNT ON;

	SELECT c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForSale] c with(nolock)	
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u  with(nolock) on u.UserId = c.UserId
	Where (c.IsNew =@IsNew )
		and (IsImport = @IsImport)
		and c.Status = 1 and ExpiredDate >= GETDATE()
	order by c.CreatedDate desc			
	
END
