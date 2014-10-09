/** @jsx React.DOM */

define(["react"], function(React) {
  return React.createClass({
    go: function() {
      var firstPlayer, secondPlayer;
      firstPlayer = this.refs.firstPlayer.getDOMNode().value;
      secondPlayer = this.refs.secondPlayer.getDOMNode().value;
      if (firstPlayer && secondPlayer) {
        return this.props.onStart(firstPlayer, secondPlayer);
      }
    },
    render: function() {
      return (
                React.DOM.div({className: "start-screen"}, 
                    React.DOM.div(null, 
                        React.DOM.div(null, 
                            React.DOM.img({src: "/img/black.png", className: "start-screen-img"}), 
                            React.DOM.span(null, "Choose name for first player: "), 
                            React.DOM.input({ref: "firstPlayer"})
                        ), 
                        React.DOM.div(null, 
                            React.DOM.img({src: "/img/white.png", className: "start-screen-img"}), 
                            React.DOM.span(null, "Choose name for second player: "), 
                            React.DOM.input({ref: "secondPlayer"})
                        ), 
                        React.DOM.button({className: "start-screen-go", onClick: this.go}, "GO!")
                    )
                )
            );
    }
  });
});
