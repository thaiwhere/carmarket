USE [CARWEB]
GO
/****** Object:  StoredProcedure [dbo].[Car_Inserting]    Script Date: 7/21/2016 5:21:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 ALTER PROCEDURE [dbo].[Contact_Insert]

     @Name nvarchar(50),
     @Email varchar(50),
     @Phone varchar(20) = '',
     @Message nvarchar(MAX),
	 	 
	 @Id		INT = 0 OUTPUT
	
AS
BEGIN

	
INSERT INTO [dbo].[Contact]
           ([Name]
           ,[Email]
           ,[Phone]
           ,[Message])
     VALUES
           (@Name
           ,@Email
           ,@Phone
           ,@Message)

	IF @@ERROR <> 0
		SET @Id = -1
	ELSE
		SET @Id = SCOPE_IDENTITY()
END
