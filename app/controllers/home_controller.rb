class HomeController < ApplicationController
  def index
    @outline = Outline.data
  end
end
