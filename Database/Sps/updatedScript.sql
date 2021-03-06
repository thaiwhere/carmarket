USE [CARWEB]

-- table CarForBuy------
SET NOCOUNT OFF
DECLARE @SQL NVARCHAR(MAX) = N'';

SELECT @SQL += N'
ALTER TABLE ' + OBJECT_NAME(PARENT_OBJECT_ID) + ' DROP CONSTRAINT ' + OBJECT_NAME(OBJECT_ID) + ';' 
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT' AND OBJECT_NAME(PARENT_OBJECT_ID) = 'CarForBuy';

PRINT @SQL
EXECUTE(@SQL)

-- table CarForSale------

ALTER TABLE [dbo].[CarForSale]
DROP COLUMN FuelConsumption

ALTER TABLE [dbo].[CarForSale]
ADD FuelConsumption SMALLINT

SET NOCOUNT OFF
DECLARE @SQL2 NVARCHAR(MAX) = N'';

SELECT @SQL2 += N'
ALTER TABLE ' + OBJECT_NAME(PARENT_OBJECT_ID) + ' DROP CONSTRAINT ' + OBJECT_NAME(OBJECT_ID) + ';' 
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT' AND OBJECT_NAME(PARENT_OBJECT_ID) = 'CarForSale';

PRINT @SQL2
EXECUTE(@SQL2)

-- table User ------
SET ANSI_PADDING ON
GO
DROP TABLE [dbo].[User]

CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](20) NOT NULL,
	[Password] [varchar](50) NULL,
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


USE [CARWEB]
GO

/****** Object:  Table [dbo].[CarForBuy]    Script Date: 8/6/2016 11:05:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE [dbo].[CarForBuy]

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[CarForBuy](
	[CarId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Year] [int] NULL,
	[ProvinceId] [varchar](10) NULL,
	[TypeId] [varchar](10) NULL,
	[WheelDriveId] [varchar](10) NULL,
	[FuelId] [varchar](10) NULL,
	[Code] [varchar](20) NULL,
	[Title] [nvarchar](100) NULL,
	[IsImport] [bit] NULL,
	[IsNew] [bit] NULL,
	[Km] [int] NULL,
	[PriceFromVN] [money] NULL,
	[PriceToVN] [money] NULL,
	[ExteriorColorId] [varchar](7) NULL,
	[InteriorColorId] [varchar](7) NULL,
	[GateNo] [smallint] NULL,
	[SeatNo] [smallint] NULL,
	[Description] [nvarchar](max) NULL,
	[GearBox] [smallint] NULL,
	[FuelSystem] [nvarchar](20) NULL,
	[FuelConsumption] [nvarchar](20) NULL,
	[CreatedDate] [smalldatetime] NULL,
	[ModifiedDate] [smalldatetime] NULL,
	[ExpiredDate] [smalldatetime] NULL,
	[Firm] [varchar](20) NULL,
	[Model] [varchar](20) NULL,
 CONSTRAINT [PK_CarForBuy] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



USE [CARWEB]
GO

/****** Object:  Table [dbo].[CarForSale]    Script Date: 8/6/2016 11:06:10 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE [dbo].[CarForSale]

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[CarForSale](
	[CarId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Year] [int] NULL,
	[ProvinceId] [varchar](10) NULL,
	[TypeId] [varchar](10) NULL,
	[WheelDriveId] [varchar](10) NULL,
	[FuelId] [varchar](10) NULL,
	[Code] [varchar](20) NULL,
	[Title] [nvarchar](100) NULL,
	[IsImport] [bit] NULL,
	[IsNew] [bit] NULL,
	[Km] [int] NULL,
	[CurrencyVN] [money] NULL,
	[CurrencyUSD] [money] NULL,
	[ExteriorColorId] [varchar](7) NULL,
	[InteriorColorId] [varchar](7) NULL,
	[GateNo] [smallint] NULL,
	[SeatNo] [smallint] NULL,
	[Description] [nvarchar](max) NULL,
	[GearBox] [smallint] NULL,
	[FuelSystem] [nvarchar](20) NULL,
	[CreatedDate] [smalldatetime] NULL,
	[ModifiedDate] [smalldatetime] NULL,
	[ExpiredDate] [smalldatetime] NULL,
	[Firm] [varchar](20) NULL,
	[Model] [varchar](20) NULL,
	[FuelConsumption] [smallint] NULL,
 CONSTRAINT [PK_CarForSale] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[CarFavourite](
	[DeviceId] [varchar](65) NOT NULL,
	[CarId] [int] NOT NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO