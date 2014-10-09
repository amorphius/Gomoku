define ["react"], (React) ->
    React.createClass
        getInitialState: -> status: "empty"
        clicked: ->
            if @state.status is "hover" and @props.gameState isnt "win"
                @setState status: @props.player
                @props.onMove @props.x, @props.y
        hover: ->
            if @state.status is "empty" and @props.gameState isnt "win"
                @setState status: "hover"
        blur: ->
            if @state.status is "hover"
                @setState status: "empty"

        render: ->
            even = (@props.x + @props.y) % 2

            statusClassName = if @state.status is "white" or @state.status is "black" then "cell_#{@state.status}" else ""
            winningClassName = if @props.winning then "cell_winning" else ""
            evenClassName = if even then "cell_1" else "cell_2"
            hoverClassName = if @state.status is "hover" then "cell_hover cell_#{@props.player}" else ""
            className = "cell #{statusClassName} #{hoverClassName} #{evenClassName} #{winningClassName}"

            `(
                <div ref="cell" className={className}
                    onClick={this.clicked}
                    onMouseEnter={this.hover}
                    onMouseLeave={this.blur}></div>
            )`