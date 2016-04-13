USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Searching]    Script Date: 4/13/2016 8:52:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].Car_Searching_Firm_Model	
	 @FirmName varchar(100),	 
	 @Model varchar(300),	
     @currentPageIndex int = 0,
     @ItemsPerPage int = 20
AS
BEGIN

	SET NOCOUNT ON;

	SELECT * 
	from [dbo].[CarForSale] c with(nolock)
	INNER join Firm f with (nolock) on c.FirmId = f.FirmId
	inner join Model m with (nolock) on f.FirmId = m.FirmID	
	Where (@FirmName is NULL or f.Name = @FirmName)
		 and (@Model is NULL or m.Name =  @Model )
	
END
