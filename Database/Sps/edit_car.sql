USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[edit_car]    Script Date: 12/4/2016 12:09:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 ALTER PROCEDURE [dbo].[edit_car]

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
	 @CurrencyVN money  =0,	 
	 
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

	UPDATE [dbo].[CarForSale]
    SET 
	   Code = 'B' + cast(@CarId as varchar) + @Model
      ,[Year] = @Year
      ,[ProvinceId] = @ProvinceId
      ,[TypeId] = @TypeId
      ,[WheelDriveId] = @WheelDriveId
      ,[FuelId] = @FuelId      
      ,[Title] = @Title
      ,[IsImport] = @IsImport
      ,[IsNew] = @IsNew
      ,[Km] = @Km
      ,[CurrencyVN] = @CurrencyVN      
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
	 WHERE Carid = @CarId and (UserId = @UserId or @UserId = 7)

	 SET @Error = @@ERROR	 
END
