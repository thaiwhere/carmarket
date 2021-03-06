USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Inserting]    Script Date: 5/31/2016 11:05:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 ALTER PROCEDURE [dbo].[Car_Visited]	

	 @DeviceId varchar(33),	 
	 @CarId	INT,
	 @CountVisit BIGINT OUTPUT
	
AS
BEGIN
	SELECT @CountVisit = ISNULL(CountVisit,0) FROM [dbo].[CarForSale]  WHERE CarId = @CarId

	IF NOT EXISTS (SELECT 1 FROM [dbo].[CarVisisted] WHERE [DeviceId] = @DeviceId and [CarId] = @CarId)
	BEGIN
		INSERT INTO [dbo].[CarVisisted]
           ([DeviceId]
           ,[CarId])
		 VALUES
           (@DeviceId
           ,@CarId)

		SET @CountVisit =  @CountVisit + 1

		UPDATE [dbo].[CarForSale]
		SET CountVisit = @CountVisit
		WHERE[CarId] = @CarId
	END
	
END
