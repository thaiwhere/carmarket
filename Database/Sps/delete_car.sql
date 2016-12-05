USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[delete_car]    Script Date: 12/5/2016 11:06:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec [delete_car] 6
ALTER PROCEDURE [dbo].[delete_car]		 
	 @CarId INT	 ,
	 @UserId INT,
	 @IsBuy BIT,
	 @Result  BIT = 0 OUTPUT
AS
BEGIN

	SET NOCOUNT ON;
	
	IF(@IsBuy = 1)
	BEGIN
		IF(Exists (Select top 1 1 from [dbo].[CarForBuy]
					Where CarId = @CarId and (UserId = @UserId or @UserId = 7)
					))
		BEGIN
			Delete [dbo].CarForBuy
			Where CarId = @CarId and (UserId = @UserId or @UserId = 7)			
			set @Result = 1
		END
	END
	ELSE
	BEGIN
		IF(Exists (Select top 1 1 from [dbo].[CarForSale]
					Where CarId = @CarId and (UserId = @UserId or @UserId = 7)
					))
		BEGIN
			Delete [dbo].[CarForSale]
			Where CarId = @CarId and (UserId = @UserId or @UserId = 7)			
			set @Result = 1
		END
	END
	IF @@ERROR <> 0
		set @Result = -1
	
	Return @Result
END
