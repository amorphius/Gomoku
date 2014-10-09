/** @jsx React.DOM */

define(["react"], function(React) {
  return React.createClass({
    getInitialState: function() {
      return {
        hidden: true
      };
    },
    componentWillReceiveProps: function(props) {
      if (props.gameState === "progress") {
        this.setState({
          hidden: false
        });
        clearTimeout(this.timer);
        this.timer = setTimeout((function(_this) {
          return function() {
            return _this.setState({
              hidden: true
            });
          };
        })(this), 3000);
      }
      if (props.gameState === "win") {
        clearTimeout(this.timer);
        return this.setState({
          hidden: false
        });
      }
    },
    reset: function() {
      return this.props.onReset();
    },
    replay: function() {
      return this.props.onReplay();
    },
    toggle: function() {
      clearTimeout(this.timer);
      if (this.state.hidden) {
        return this.setState({
          hidden: false
        });
      } else {
        return this.setState({
          hidden: true
        });
      }
    },
    render: function() {
      var even, notify, win;
      win = React.DOM.span(null, this.props.player, " has won!");
      even = React.DOM.span(null, "Even!");
      notify = React.DOM.span(null, this.props.player, "'s move now");
      return (
                React.DOM.div({className: this.state.hidden ? "status-bar hidden" : "status-bar"}, 
                    React.DOM.div({className: "content"}, 
                        this.props.gameState == "win" &&  win, 
                        this.props.gameState == "even" && even, 
                        this.props.gameState == "progress" && notify, " ", 
                        React.DOM.button({onClick: this.reset}, "Reset"), " ", 
                        React.DOM.button({onClick: this.replay}, "Replay")
                    ), 
                    React.DOM.br(null), 
                    React.DOM.div({className: "status-bar__toggler", onClick: this.toggle}, 
                        "^"
                    )
                )
            );
    }
  });
});
