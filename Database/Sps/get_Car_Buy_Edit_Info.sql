USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_Car_Buy_Edit_Info]    Script Date: 12/5/2016 11:04:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[get_Car_Buy_Edit_Info]
	 @CarId int	 ,
	 @UserId int
AS

/*

exec get_Car_Edit_Info 2

*/ 
BEGIN

	SET NOCOUNT ON;
	
	Select distinct
		c.UserId,
		c.CarId,
		c.Firm,
		c.Model,
		c.IsNew,
		c.IsImport,
		c.Year as [Year],
		c.TypeId,		
		c.Title,
		c.Description,
		c.km,
		c.GearBox,
		c.PriceFromVN,
		c.PriceToVN,
		c.ProvinceId,
		u.UserName ContactName,		
		u.Tel ContactTel,
		u.Address as [Address],
		c.SeatNo,
		c.GateNo,
		c.ExteriorColorId,		
		c.[InteriorColorId],
		c.FuelConsumption,
		c.FuelId,
		c.FuelSystem,
		c.[WheelDriveId],
		Convert(varchar(10), c.CreatedDate,120)  as CreatedDate
	from [dbo].[CarForBuy] c with(nolock)		
	inner join [User] u  with(nolock) on u.UserId = c.UserId		
	Where c.CarId = @CarId and (u.UserId = @UserId or @UserId = 7)
	
END
