class HomeController < ApplicationController
  def index
    @outline = Outline.data
    @placeholders = Outline.placeholders.to_json
  end

  def download
    params[:outline]
    send_data params[:outline], :filename => 'some.txt'
  end
end
