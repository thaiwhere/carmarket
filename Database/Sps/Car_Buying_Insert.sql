USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Buying]    Script Date: 7/13/2016 10:45:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Car_Buying_Insert]	

	 @UserId int,
	 @Firm varchar(20),
	 @Model varchar(20),	 

	 @TypeId varchar(10), --Dòng xe:* 	 
	 @ProvinceId varchar(10),

	 @ExteriorColorId varchar(7),
	 @InteriorColorId varchar(7),

	 @FuelId varchar(10), --- Nhiên liệu
	 @WheelDriveId varchar(10),   --Dẫn động: ,	 

	 @Year int,   -- Năm sản xuất/đời:* 	 
	 @Code varchar(20) = '',
	 @Title nvarchar(100) = '',
	 @IsImport bit, ----Xuất xứ:* 
	 @IsNew bit,--1: New, 0: Old	 
	 @Km int = 0,

	 @PriceFromVN money  =0,	 
	 @PriceToVN money  =0,	 
	 
	 @GateNo smallint = 0,
	 @SeatNo smallint = 0,
	 @Description nvarchar(max) ='',
	 @GearBox smallint = 0,
	 
	 @FuelSystem nvarchar(20) ='',
	 @FuelConsumption nvarchar(20) ='',
	 
	 @CreatedDate smalldatetime,

	 @CarId		INT = 0 OUTPUT
	
AS
BEGIN

	INSERT INTO [dbo].[CarForBuy]
           ([UserId]
		   ,[Firm]
           ,[Model]
           ,[Year]
           ,[ProvinceId]
           ,[TypeId]
           ,[WheelDriveId]
           ,[FuelId]
           ,[Code]
           ,[Title]
           ,[IsImport]
           ,[IsNew]
           ,[Km]
           ,[PriceFromVN]
		   ,[PriceToVN]           
           ,[ExteriorColorId]
           ,[InteriorColorId]
           ,[GateNo]
           ,[SeatNo]
           ,[Description]
           ,[GearBox]
           ,[FuelSystem]
           ,[FuelConsumption]
           ,[CreatedDate]           
           ,[ExpiredDate]
		   ,[Status])
     VALUES(
           @UserId
		   ,@Firm
		   ,@Model
		   ,@Year
		   ,@ProvinceId
		   ,@TypeId
		   ,@WheelDriveId
		   ,@FuelId
		   ,'code'
		   ,@Title
		   ,@IsImport
		   ,@ISNew
		   ,@Km
		   ,@PriceFromVN
		   ,@PriceToVN		   
		   ,@ExteriorColorId
		   ,@InteriorColorId
		   ,@GateNo
		   ,@SeatNo
		   ,@Description
		   ,@GearBox
		   ,@FuelSystem
		   ,@FuelConsumption
		   ,@CreatedDate
		   ,DATEADD(day,30,@CreatedDate)
		   ,0 )

	IF @@ERROR <> 0
		SET @CarId = -1
	ELSE
		SET @CarId = SCOPE_IDENTITY()

	IF (@CarId > 0 )
	BEGIN
		UPDATE [dbo].[CarForBuy]
		SET Code = 'M' + cast(@CarId as varchar) + @Model
		WHERE CarId = @CarId
	END

	IF @@ERROR <> 0
		SET @CarId = -1
END
