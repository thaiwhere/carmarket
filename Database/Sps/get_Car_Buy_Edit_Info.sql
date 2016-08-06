USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_Car_Detail]    Script Date: 6/13/2016 10:30:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[get_Car_Buy_Edit_Info]
	 @CarId int	 
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
	Where c.CarId = @CarId
	
END
