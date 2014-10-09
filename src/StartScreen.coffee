define ["react"], (React) ->
    React.createClass
        go: ->
            firstPlayer = @refs.firstPlayer.getDOMNode().value
            secondPlayer = @refs.secondPlayer.getDOMNode().value
            if firstPlayer and secondPlayer then @props.onStart firstPlayer, secondPlayer
        render: ->
            `(
                <div className="start-screen">
                    <div>
                        <div>
                            <img src="/img/black.png" className="start-screen-img" />
                            <span>Choose name for first player: </span>
                            <input ref="firstPlayer" />
                        </div>
                        <div>
                            <img src="/img/white.png" className="start-screen-img" />
                            <span>Choose name for second player: </span>
                            <input ref="secondPlayer" />
                        </div>
                        <button className="start-screen-go" onClick={this.go}>GO!</button>
                    </div>
                </div>
            )`