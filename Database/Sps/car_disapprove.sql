USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[delete_car]    Script Date: 10/15/2016 12:02:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec [delete_car] 6
ALTER PROCEDURE [dbo].[car_disapprove] 
	 @CarId INT	 ,
	 @UserId INT,	 
	 @IsBuy BIT,
	 @Result  BIT = 0 OUTPUT
AS
BEGIN

	SET NOCOUNT ON;
	
	IF(@UserId <> 7) RETURN 0

	IF(@IsBuy = 1)
	BEGIN
		UPDATE CarForBuy
		SET [Status] = 3
		WHERE CarId = @CarId

		set @Result = 1
	END
	ELSE
	BEGIN
		UPDATE CarForSale
		SET [Status] = 3
		WHERE CarId = @CarId

		set @Result = 1
	END

	IF @@ERROR <> 0
		set @Result = -1
	
	Return @Result
END
