USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching]    Script Date: 13/04/2016 3:01:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Car_Searching]	
	 @FirmName varchar(100),	 
	 @Model varchar(20),
	 @IsNew smallint = 0,
	 @IsImport smallint  = 0,  -- 0: All
	 @fromPrice money = 0, -- in VNĐ
	 @toPrice money = 0,
	 @Year int = 0,
	 @Province nvarchar(30)=null,	 	 
	 @ExteriorColor varchar(7) = nULL,
	 @InteriorColor varchar(7) = null,
	 @WindowNo smallint = 0,
	 @SeatNo smallint = 0,	 
     @currentPageIndex int = 0,
     @ItemsPerPage int = 100
AS
BEGIN

	SET NOCOUNT ON;

	SELECT * 
	from [dbo].[CarForSale] c with(nolock)
	INNER join Firm f with (nolock) on c.FirmId = f.FirmId
	inner join Model m with (nolock) on f.FirmId = m.FirmID
	inner join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	inner join InteriorColor inter on c.InteriorColorId = inter.InteriorColorId
	inner join ExteriorColor ext on c.ExpiredDate = ext.ExteriorColorId

	Where (@FirmName = '' or f.Name = @FirmName)
		and (@Model = '' or m.Name =  @Model)
		and (@IsNew = 0 or c.IsNew =@IsNew )
		and (@IsImport = 0 OR IsImport = @IsImport)
		and (@fromPrice = 0 or @toPrice = 0 or c.CurrencyVN between @fromPrice and @toPrice)		
		and (@Year = 0 or c.[Year] = @Year)
		and (@Province is null or p.Name = @Province)		
		and (@ExteriorColor is null or ext.ExteriorColorId = @ExteriorColor)
		and (@InteriorColor is null or inter.InteriorColorId = @InteriorColor)
		and (@WindowNo = 0 or c.WindowNo = @WindowNo)
		and (@SeatNo = 0 or c.SeatNo = @SeatNo)
			
END
