class GamesController < ApplicationController
  def index
    games_path = Rails.root.join("public", "games")
    if Dir.exist?(games_path)
      render plain: "si existe Available games: #{@games.inspect}"
      @games = Dir.entries(games_path).select do |entry|
        File.directory?(File.join(games_path, entry)) && !(entry == '.' || entry == '..')
      end
    else
          render plain: "no existe Available games: #{@games.inspect}"
      @games = []
    end

    # render plain: "Available games: #{@games.inspect}"
  end
end
