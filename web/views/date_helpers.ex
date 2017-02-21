defmodule CercleApi.DateHelpers do
  import Ecto
  
  use Phoenix.HTML
  use Timex
  alias Ecto.DateTime
  


  def timex_date_format(datetime) do
    Timex.format!(Ecto.DateTime.to_erl(datetime), "%a %d %b - %H:%M", :strftime)
  end

  def timex_hour_format(datetime) do
    Timex.format!(Ecto.DateTime.to_erl(datetime), "%H:%M", :strftime)
  end

  def time_ago_in_words(datetime) do
    date = datetime
      |> DateTime.to_erl
      |> :calendar.datetime_to_gregorian_seconds
      |> Kernel.-(62167219200)
      |> Timex.from_unix
      |> Timex.from_now
  end

  def change_time_zone(datetime,time_zone) do
    Timezone.convert(Ecto.DateTime.to_erl(datetime),time_zone)
  end

  def change_timex_date_format(datetime) do
    Timex.format!(datetime, "%a %d %b @ %H:%M", :strftime)
  end

   def change_timex_custom_date_format(datetime) do
    Timex.format!(datetime, "%m/%d/%Y", :strftime)
  end

  def change_timex_hour_format(datetime) do
    Timex.format!(datetime, "%H:%M", :strftime)
  end

end