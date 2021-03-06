USE [CARWEB]
GO
/****** Object:  UserDefinedFunction [dbo].[strSplit]    Script Date: 4/27/2016 3:42:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function  [dbo].[strSplit] ( @string nvarchar( 4000), @splitter char( 1) )

returns @res table ( id int primary key, rank int, val nvarchar( 4000) )

as

begin

     if substring ( @string, len ( @string), 1)<>@splitter

          set @string= @string+@splitter

     declare @start int, @word nvarchar(4000), @charindex int, @i int

     set @i=1

     set @start=1

     set @charindex= charindex( @splitter, @string, @start)

     while (@charindex <> 0)begin

          set @word= substring( @string, @start, @charindex - @start)

          set @start= @charindex +1

          set @charindex= charindex( @splitter, @string, @start)

          insert into @res  values ( @start, @i, @word)

          set @i=@i+1

     end

     return

end




