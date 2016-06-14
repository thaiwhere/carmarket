USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_New_Import_Cars]    Script Date: 4/22/2016 2:52:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec [delete_car] 6
ALTER PROCEDURE [dbo].[delete_car]		 
	 @CarId INT	 
AS
BEGIN

	SET NOCOUNT ON;

	Delete [dbo].[CarForSale]
	Where CarId = @CarId
	IF @@ERROR <> 0
		return -1
	Else
		return @Carid
END
