USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Inserting]    Script Date: 4/13/2016 8:52:54 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 ALTER PROCEDURE [dbo].[Car_Inserting]	

	 @UserId int,
	 @FirmId smallint,  -- Hang che tao
	 @ModelId smallint,   -- Đời xe
	 @ClassId varchar(2),   -- Phân hạng đời xe 
	 @Year int,   -- Năm sản xuất/đời:* 
	 @ProvinceId varchar(10),
	 @TypeId varchar(10), --Dòng xe:* 
	 @WheelDriveId varchar(10),   --Dẫn động: ,
	 @FuelId varchar(10), --- Nhiên liệu
	 @Code varchar(20),
	 @Title nvarchar(100),
	 @IsImport bit, ----Xuất xứ:* 
	 @IsNew bit,--1: New, 0: Old
	 @Status bit,--0: chua bán, 1: dã bán
	 @Km int,
	 @CurrencyVN money,
	 @CurrencyUSD money,
	 @ExteriorColorId varchar(7),
	 @InteriorColorId varchar(7),
	 @WindowNo smallint,
	 @SeatNo smallint,
	 @Description nvarchar(max),
	 @GearBox smallint,
	 @FuelSystem nvarchar(20),
	 @FuelConsumption nvarchar(20),
	 @CreatedDate smalldatetime,
	 @ModifiedDate smalldatetime,
	 @ExpiredDate smalldatetime
	 
	
AS
BEGIN

	INSERT INTO CarForSale(UserId,FirmId,ModelId,ClassId,[Year],ProvinceId,TypeId,WheelDriveId,FuelId,Code,Title,IsImport,IsNew,[Status],Km,CurrencyVN,CurrencyUSD,ExteriorColorId,InteriorColorId,WindowNo,SeatNo,[Description],GearBox,FuelSystem,FuelConsumption,CreatedDate,ModifiedDate,ExpiredDate)
	VALUES(@UserId,@FirmId,@ModelId,@ClassId,@Year,@ProvinceId,@TypeId,@WheelDriveId,@FuelId,@Code,@Title,@IsImport,@IsNew,@Status,@Km,@CurrencyVN,@CurrencyUSD,@ExteriorColorId,@InteriorColorId,@WindowNo,@SeatNo,@Description,@GearBox,@FuelSystem,@FuelConsumption,@CreatedDate,@ModifiedDate,@ExpiredDate)

END
