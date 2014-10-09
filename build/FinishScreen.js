/** @jsx React.DOM */

define(["react"], function(React) {
  return React.createClass({
    render: function() {
      return (
                React.DOM.div(null, 
                    React.DOM.span(null, React.DOM.b(null, this.props.winner), " has won!"), 
                    React.DOM.br(null), 
                    React.DOM.button({onClick: this.props.onReset}, "Reset"), 
                    React.DOM.button({onClick: this.props.onReplay}, "Replay")
                )
            );
    }
  });
});
