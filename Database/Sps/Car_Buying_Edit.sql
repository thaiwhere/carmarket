USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Buying_Edit]    Script Date: 7/13/2016 10:14:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 ALTER PROCEDURE [dbo].[Car_Buying_Edit]

	 @UserId int,
	 @CarId int,
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
	 
	 @ModifiedDate smalldatetime,

	 @Error Bit OUTPUT
	
AS
BEGIN

	UPDATE [dbo].[CarForBuy]
    SET 
	  Code = 'M' + cast(@CarId as varchar) + @Model
      ,[Year] = @Year
      ,[ProvinceId] = @ProvinceId
      ,[TypeId] = @TypeId
      ,[WheelDriveId] = @WheelDriveId
      ,[FuelId] = @FuelId      
      ,[Title] = @Title
      ,[IsImport] = @IsImport
      ,[IsNew] = @IsNew
      ,[Km] = @Km
      ,[PriceFromVN]  = @PriceFromVN
	  ,[PriceToVN] = @PriceToVN
      ,[ExteriorColorId] = @ExteriorColorId
      ,[InteriorColorId] = @InteriorColorId
      ,[GateNo] = @GateNo
      ,[SeatNo] = @SeatNo
      ,[Description] = @Description
      ,[GearBox] = @GearBox
      ,[FuelSystem] = @FuelSystem      
      ,[ModifiedDate] = @ModifiedDate
      ,[ExpiredDate] = DATEADD(day,30,@ModifiedDate)
      ,[Firm] = @Firm
      ,[Model] = @Model
      ,[FuelConsumption] = @FuelConsumption
	  ,[Status] = 0
	 WHERE CarId = @CarId and UserId = @UserId

	 SET @Error = @@ERROR

END
