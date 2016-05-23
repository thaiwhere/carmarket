Select *
Into   #Temp
From  [dbo].[Province]
order by Name 

select Name from #Temp

declare @txt nvarchar(Max)
declare @txtName nvarchar(Max)

Declare @Id varchar(10)
Declare @Name nvarchar(30)

set @txt = ''
set @txtName = ''

While (Select Count(*) From #Temp) > 0
Begin

    Select Top 1 @Id = [ProvinceId], @Name = Name From #Temp

    --Do some processing here
	set @txt = @txt + LTRIM(RTRIM(@Id)) + ','
	set @txtName = @txtName + LTRIM(RTRIM(@Name)) + ','

    Delete #Temp Where [ProvinceId] = @Id

End

select @txt
select @txtName

drop table #Temp