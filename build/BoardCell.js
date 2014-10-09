/** @jsx React.DOM */

define(["react"], function(React) {
  return React.createClass({
    getInitialState: function() {
      return {
        status: "empty"
      };
    },
    clicked: function() {
      if (this.state.status === "hover" && this.props.gameState !== "win") {
        this.setState({
          status: this.props.player
        });
        return this.props.onMove(this.props.x, this.props.y);
      }
    },
    hover: function() {
      if (this.state.status === "empty" && this.props.gameState !== "win") {
        return this.setState({
          status: "hover"
        });
      }
    },
    blur: function() {
      if (this.state.status === "hover") {
        return this.setState({
          status: "empty"
        });
      }
    },
    render: function() {
      var className, even, evenClassName, hoverClassName, statusClassName, winningClassName;
      even = (this.props.x + this.props.y) % 2;
      statusClassName = this.state.status === "white" || this.state.status === "black" ? "cell_" + this.state.status : "";
      winningClassName = this.props.winning ? "cell_winning" : "";
      evenClassName = even ? "cell_1" : "cell_2";
      hoverClassName = this.state.status === "hover" ? "cell_hover cell_" + this.props.player : "";
      className = "cell " + statusClassName + " " + hoverClassName + " " + evenClassName + " " + winningClassName;
      return (
                React.DOM.div({ref: "cell", className: className, 
                    onClick: this.clicked, 
                    onMouseEnter: this.hover, 
                    onMouseLeave: this.blur})
            );
    }
  });
});
