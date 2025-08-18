def index
  games_path = Rails.root.join("public", "games")
  if Dir.exist?(games_path)
    @games = Dir.entries(games_path).select do |entry|
      File.directory?(File.join(games_path, entry)) && !(entry == '.' || entry == '..')
    end
  else
    @games = []
  end

  render plain: "Available games: #{@games.inspect}"
end
