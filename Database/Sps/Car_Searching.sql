USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching]    Script Date: 9/15/2016 4:52:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Car_Searching]	
	 @FirmName varchar(100),	 
	 @Models varchar(1000),
	 @IsGearBox smallint = -1, --0: auto, 1: composte auto & manual, >=4: manual, -1: All
	 @IsNew smallint = -1,  -- 0: Old, 1: New, -1: All
	 @IsImport smallint  = -1, -- 0 : Domestic, 1: Import : -1 : All
	 @FromPrice money = 0, -- in VNĐ
	 @ToPrice money = 0,
	 @Year int = 0,
	 @Province varchar(10)='0',	 	 
	 @ExteriorColor varchar(7) = nULL,
	 @InteriorColor varchar(7) = null,
	 @GateNo smallint = 0,
	 @SeatNo smallint = 0,	 
     @CurrentPageIndex int = 0,
     @ItemsPerPage int = 100
AS

/*

exec [Car_Searching] '', ''
*/
BEGIN

	SET NOCOUNT ON;

	DECLARE @SelectedModels AS TABLE (Model varchar(20))		
	INSERT INTO @SelectedModels (Model)
	SELECT CAST(VAL as varchar(20))  AS SuperId
	FROM dbo.strSplit(@Models,',')

	SELECT c.CarId, u.UserId, c.IsNew, c.IsImport, c.[year], c.Firm as FirmName, c.Title, c.[Description], c.Km, c.GearBox, c.CurrencyVN, p.Name as Province, u.UserName ContactName, u.Tel ContactTel
	from [dbo].[CarForSale] c with(nolock)		
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join [User] u with(nolock) on u.UserId = c.UserId
	inner join InteriorColor inter on c.InteriorColorId = inter.InteriorColorId
	inner join ExteriorColor ext on c.ExteriorColorId = ext.ExteriorColorId

	Where (@FirmName = '' or @FirmName  = 'All' or @FirmName is NULL or c.[Firm] = @FirmName)
		and (@Models = '' or @Models = 'All' or @Models is NULL or c.Model in (Select Model From @SelectedModels))
		and (@IsGearBox = -1 or c.GearBox = @IsGearBox)
		and (@IsNew = -1 or c.IsNew =@IsNew )
		and (@IsImport = -1 OR c.IsImport = @IsImport)
		and (@FromPrice = 0 or @ToPrice = 0 or c.CurrencyVN between @FromPrice and @ToPrice)		
		and (@Year = 0 or c.[Year] = @Year)
		and (@Province = '0' or c.ProvinceId = @Province)		
		and (@ExteriorColor is null or c.ExteriorColorId = @ExteriorColor)
		and (@InteriorColor is null or c.InteriorColorId = @InteriorColor)
		and (@GateNo = 0 or c.GateNo = @GateNo)
		and (@SeatNo = 0 or c.SeatNo = @SeatNo)
		and (c.Status = 1) and ExpiredDate >= GETDATE()
	order by c.CreatedDate desc
			
END
