USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[SP_TOP_10_CARS]    Script Date: 4/13/2016 8:53:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[SP_TOP_10_CARS]
AS
BEGIN
	-- Insert statements for procedure here
	
	SELECT TOP 10 u.UserName,u.Name as ContactName,u.Tel1 as ContactTel,u.Tel2,Firm.Name,Model.Name as Model,cl.Name as cl, c.[Year], Province.Name as Location,wh.Name as WheelDrive,t.Name as [Type],Fuel.Name as Fuel
	, c.Code,c.Title, c.IsImport as Source,c.[Status], c.Km,c.CurrencyVN as Price,c.CurrencyUSD,  ex.Name AS ColorOut,inc.Name as ColorIn
	,c.FuelConsumption, c.CreatedDate, c.ModifiedDate, c.ExpiredDate,c.[Description] as Content,c.SeatNo as SeatCount, c.WindowNo as DoorCount
	FROM  CarForSale c,[User] u,Class cl, Firm,Model,Province,WheelDrive wh, Fuel,[Type] t,ExteriorColor ex,InteriorColor inc
	where c.UserId = u.UserId
	and c.FirmId = Firm.FirmId
	and c.ClassId = cl.ClassId
	and c.ModelId = model.ModelID
	and c.ProvinceId = Province.ProvinceId
	and c.WheelDriveId = wh.WheelDriveId
	and c.TypeId = t.TypeId
	and c.FuelId = Fuel.FuelId
	and c.ExteriorColorId = ex.ExteriorColorId
	and c.InteriorColorId = inc.InteriorColorId
	
	
END


