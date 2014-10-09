define ["react", "./GameBoard.js", "./StartScreen.js"], (React, Board, StartScreen) ->
    React.createClass
        getInitialState: ->
            gameState: "start"

        start: (firstPlayer, secondPlayer) ->
            @black = firstPlayer
            @white = secondPlayer
            @setState gameState: "progress"

        reset: ->
            @setState gameState: "start"

        replay: ->
            @setState gameState: "start"
            setTimeout =>
                @setState gameState: "progress"
            , 0

        render: ->
            startScreen = `<StartScreen onStart={this.start} />`
            board = `<Board black={this.black} white={this.white} onReset={this.reset} onReplay={this.replay} />`

            `(
                <div>
                    {this.state.gameState == "start" && startScreen}

                    {this.state.gameState == "progress" && board}

                </div>
            )`
