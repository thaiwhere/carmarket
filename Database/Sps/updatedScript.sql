USE [CARWEB]

-- table CarForBuy------
ALTER TABLE [CarForBuy]
DROP CONSTRAINT [FK__CarForBuy__UserI__15702A09]

-- table CarForSale------

ALTER TABLE [dbo].[CarForSale]
DROP COLUMN FuelConsumption

ALTER TABLE [dbo].[CarForSale]
ADD FuelConsumption SMALLINT

ALTER TABLE [CarForSale]
DROP CONSTRAINT [FK__CarForSal__UserI__078C1F06] 

ALTER TABLE [CarForSale]
DROP CONSTRAINT [FK__CarForSal__UserI__10AB74EC]

-- table User ------
SET ANSI_PADDING ON
GO
DROP TABLE [dbo].[User]

CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](20) NOT NULL,
	[Password] [varchar](30) NULL,
	[Roles] [varchar](10) NULL,
	[Email] [varchar](20) NULL,
	[Tel] [varchar](20) NULL,
	[Address] [nvarchar](100) NULL,
	[ProvinceId] [varchar](10) NULL,
	[CreatedDate] [smalldatetime] NULL,
	[ModifiedDade] [smalldatetime] NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO
