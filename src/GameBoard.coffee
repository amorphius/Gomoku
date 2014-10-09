define ["react", "./BoardCell.js", "./StatusBar.js"], (React, Cell, StatusBar) ->
    React.createClass
        componentWillMount: ->
            @boardMatrix = []
            for i in [0...15]
                @boardMatrix[i] = []
                for j in [0...15]
                    @boardMatrix[i][j] = content: "empty", winning: false

        getInitialState: ->
            currentPlayer: "black"
            count: 0
            gameState: "progress"

        checkWinningPosition: (x, y) ->

            getNeighbors = (bottomDirection, rightDirection) =>
                neighbors = 0
                i = x + bottomDirection
                j = y + rightDirection

                while i >= 0 and i < 15 and j >= 0 and j < 15
                    if @boardMatrix[i][j].content is @state.currentPlayer then neighbors++ else break
                    i += bottomDirection
                    j += rightDirection

                neighbors

            highlight =(bottomDirection, rightDirection) =>
                @boardMatrix[x][y].winning = yes
                i = x + bottomDirection
                j = y + rightDirection

                while i >= 0 and i < 15 and j >= 0 and j < 15
                    if @boardMatrix[i][j].content is @state.currentPlayer
                        @boardMatrix[i][j].winning = yes
                    else break
                    i += bottomDirection
                    j += rightDirection


            left = getNeighbors 0, -1
            right = getNeighbors 0, 1
            top = getNeighbors -1, 0
            bottom = getNeighbors 1, 0
            leftTop = getNeighbors -1, -1
            rightBottom = getNeighbors 1, 1
            rightTop = getNeighbors -1, 1
            leftBottom = getNeighbors 1, -1

            if left + right >= 4
                highlight 0, -1
                highlight 0, 1
                @setState gameState: "win"
                true
            else if top + bottom >= 4
                highlight -1, 0
                highlight 1, 0
                @setState gameState: "win"
                true
            else if leftTop + rightBottom >= 4
                highlight -1, -1
                highlight 1, 1
                @setState gameState: "win"
                true
            else if rightTop + leftBottom >= 4
                highlight -1, 1
                highlight 1, -1
                @setState gameState: "win"
                true

        move: (x, y) ->
            @setState count: @state.count + 1
            if @state.count + 1 is 15*15
                @setState gameState: "even"

            unless @checkWinningPosition x, y
                if @state.currentPlayer is "black"
                    @boardMatrix[x][y].content = "black"
                    @setState currentPlayer: "white"
                else
                    @boardMatrix[x][y].content = "white"
                    @setState currentPlayer: "black"

        render: ->
            rows = []
            for i in [0...15]
                cells = []
                for j in [0...15]
                    cells.push `<Cell x={i} y={j} player={this.state.currentPlayer} winning={this.boardMatrix[i][j].winning} gameState={this.state.gameState}
                        onMove={this.move} />`


                rows.push `<div className="board-row">{cells}</div>`

            `(
                <div className="board">
                    <StatusBar onReset={this.props.onReset} onReplay={this.props.onReplay} player={this.state.currentPlayer == "black" ? this.props.black : this.props.white} gameState={this.state.gameState} />
                    {rows}
                </div>
            )`