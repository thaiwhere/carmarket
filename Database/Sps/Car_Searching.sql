USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching]    Script Date: 4/13/2016 8:52:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Car_Searching]	
	 @FirmName varchar(100),	 
	 @Model varchar(300),
	 @IsImport bit  = NULL,
	 @fromPrice money = null,
	 @toPrice money = null,
	 @Year int = null,
	 @Province nvarchar(30)=null,
	 @Status bit = NULL,
	 @PriceVN money = NULL,
	 @PriceUSD money = NULL,
	 @ExteriorColor varchar(7) = nULL,
	 @InteriorColor varchar(7) = null,
	 @WindowNo smallint = null,
	 @SeatNo smallint = null,
	 @IsNew bit =NULL,
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
	Where (@FirmName is NULL or f.Name = @FirmName) 
		and (@Model is NULL or m.Name =  @Model)
		and (@IsImport is NULl OR IsImport = @IsImport)
		and (@PriceVN is null or c.CurrencyVN = @PriceVN)
		and (@Year is null or c.[Year] = @Year)
		and (@Province is null or p.Name = @Province)
		and (@Status is NULl OR [Status] = @Status)
		and (@ExteriorColor is null or ext.ExteriorColorId = @ExteriorColor)
		and (@InteriorColor is null or inter.InteriorColorId = @InteriorColor)
		and (@WindowNo is null or c.WindowNo = @WindowNo)
		and (@SeatNo is null or c.SeatNo = @SeatNo)
		and (@IsNew is null or c.IsNew =@IsNew )
	
END
