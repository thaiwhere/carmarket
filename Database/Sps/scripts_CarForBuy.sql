USE [CARWEB]
ALTER TABLE [dbo].[CarForBuy]
	ADD CountVisit bigint
	UPdate [dbo].[CarForBuy]	
	set code = 'M' + cast(Carid as varchar) + '@' + Model