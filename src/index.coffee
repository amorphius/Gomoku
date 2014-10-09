define ["react", "./GameObj.js"], (React, Game) ->
    React.renderComponent `<Game />`, document.getElementById "app"