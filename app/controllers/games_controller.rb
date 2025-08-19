class GamesController < ApplicationController
  def index
    # Lista las carpetas dentro de app/views/games (cada carpeta es un juego)
    games_path = Rails.root.join("public", "games")
    @games = Dir.entries(games_path).select do |entry|
      File.directory?(File.join(games_path, entry)) && !(entry == "." || entry == "..")
    end
    puts "Available games: #{@games.inspect}"  # Debugging line to check available games
  end

  def show
    game_name = params[:id]
    render template: "games/#{game_name}/index"
  rescue ActionView::MissingTemplate
    render plain: "Juego no encontrado", status: :not_found
  end
end
