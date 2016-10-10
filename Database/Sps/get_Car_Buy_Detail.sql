USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[get_Car_Detail]    Script Date: 6/8/2016 1:12:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[get_Car_Buy_Detail]
	 @CarId int	 ,
	 @UserId int = 0
AS

/*

exec get_Car_Detail 23

*/ 
BEGIN

	SET NOCOUNT ON;
	
	Select distinct
		c.UserId,
		c.CarId,
		c.Firm,
		c.Model,
		Case c.IsNew when 1 then N'Mới' else N'Cũ' end as IsNew,
		Case c.IsImport when 1 then N'Nhập khẩu' else N'Trong nuớc' end as IsImport,
		c.Year as [Year],
		t.Name as [Type],		
		c.Title,
		c.Description,
		c.km,
		Case c.GearBox when 0 then N'Tự động' when 1 then N'Số hỗn hợp' else N'Số sàn (' + convert(nvarchar(2), c.GearBox) + N' số)' end as GearBox,		
		p.Name as Province,
		u.UserName ContactName,
		u.Tel ContactTel,		
		u.Address as [Address],
		c.SeatNo,
		c.GateNo,
		ex.Name as ExteriorColor,
		ic.Name as InteriorColor,
		c.FuelConsumption,
		Fuel.Name as Fuel,
		c.FuelSystem,
		w.Name as WheelDrive,
		c.Code,		
		Convert(varchar(10), c.CreatedDate,120)  as CreatedDate,
		ISNULL(c.CountVisit,0) as CountVisit
	from [dbo].[CarForBuy] c with(nolock)
	left join [Type] t with (nolock) on t.TypeId = c.TypeId		
	left join Province p with(nolock) on p.ProvinceId = c.ProvinceId
	left join [User] u  with(nolock) on u.UserId = c.UserId
	left join ExteriorColor ex with (nolock) on ex.[ExteriorColorId] = c.ExteriorColorId
	left join InteriorColor ic with (nolock) on ic.InteriorColorId = c.InteriorColorId
	left join WheelDrive w with (nolock) on w.WheelDriveId = c.WheelDriveId
	left join Fuel with (nolock) on Fuel.FuelId = c.FuelId
	Where c.CarId = @CarId and 	(@UserId > 0  OR (	c.Status = 1 and ExpiredDate >= GETDATE()) )
	
END
