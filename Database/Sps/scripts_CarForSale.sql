USE [CARWEB]
GO

ALTER TABLE [dbo].[CarForSale]
	DROP COLUMN IsReview	

	ALTER TABLE [dbo].[CarForSale]	
	ADD [Status] tinyint


