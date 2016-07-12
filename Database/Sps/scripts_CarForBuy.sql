USE [CARWEB]
GO

/****** Object:  Table [dbo].[CarForSale]    Script Date: 7/12/2016 6:21:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
	[CreatedDate] [smalldatetime] NULL,
	[ModifiedDate] [smalldatetime] NULL,
	[ExpiredDate] [smalldatetime] NULL,
	[Firm] [varchar](20) NULL,
	[Model] [varchar](20) NULL,
	[FuelConsumption] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[CarForBuy]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO


