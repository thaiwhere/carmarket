USE [CARWEB]
GO

	
	UPdate [dbo].[CarForSale]	
	set code = 'B' + cast(Carid as varchar) + '@' + Model

