USE [CARWEB]

ALTER TABLE [dbo].[CarForSale]
DROP COLUMN FuelConsumption

ALTER TABLE [dbo].[CarForSale]
ADD FuelConsumption SMALLINT

