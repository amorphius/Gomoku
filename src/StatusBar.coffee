define ["react"], (React) ->
    React.createClass
        getInitialState: ->
            hidden: yes

        componentWillReceiveProps: (props) ->
            if props.gameState is "progress"
                @setState hidden: no
                clearTimeout @timer
                @timer = setTimeout =>
                    @setState hidden: yes
                , 3000

            if props.gameState is "win"
                clearTimeout @timer
                @setState hidden: no
        reset: -> @props.onReset()
        replay: -> @props.onReplay()
        toggle: ->
            clearTimeout @timer
            if @state.hidden then @setState hidden: no else @setState hidden: yes
        render: ->
            win = `<span>{this.props.player} has won!</span>`
            even = `<span>Even!</span>`
            notify = `<span>{this.props.player}'s move now</span>`
            `(
                <div className={this.state.hidden ? "status-bar hidden" : "status-bar"}>
                    <div className="content">
                        {this.props.gameState == "win" &&  win}
                        {this.props.gameState == "even" && even}
                        {this.props.gameState == "progress" && notify}&nbsp;
                        <button onClick={this.reset}>Reset</button>&nbsp;
                        <button onClick={this.replay}>Replay</button>
                    </div>
                    <br />
                    <div className="status-bar__toggler" onClick={this.toggle}>
                        ^
                    </div>
                </div>
            )`