USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_New_Import_Cars]    Script Date: 4/22/2016 2:52:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec [car_saled] 6
ALTER PROCEDURE [dbo].[car_saled]		 
	 @CarId INT	 ,
	 @UserId INT,
	 @Result  BIT = 0 OUTPUT
AS
BEGIN

	SET NOCOUNT ON;
	
	IF(Exists (Select top 1 1 from [dbo].[CarForSale]
				Where CarId = @CarId and UserId = @UserId
				))
	BEGIN
		UPDATE [dbo].[CarForSale]
		SET [Status] = 2
		Where CarId = @CarId and UserId = @UserId

		set @Result = 1
	END

	IF @@ERROR <> 0
		set @Result = -1
	
	Return @Result
END
