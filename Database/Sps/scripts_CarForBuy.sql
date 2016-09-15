USE [CARWEB]

	ALTER TABLE [dbo].[CarForBuy]
	DROP COLUMN IsReview	

	ALTER TABLE [dbo].[CarForBuy]	
	ADD [Status] tinyint


