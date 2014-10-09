/** @jsx React.DOM */

define(["react", "./GameBoard.js", "./StartScreen.js"], function(React, Board, StartScreen) {
  return React.createClass({
    getInitialState: function() {
      return {
        gameState: "start"
      };
    },
    start: function(firstPlayer, secondPlayer) {
      this.black = firstPlayer;
      this.white = secondPlayer;
      return this.setState({
        gameState: "progress"
      });
    },
    reset: function() {
      return this.setState({
        gameState: "start"
      });
    },
    replay: function() {
      this.setState({
        gameState: "start"
      });
      return setTimeout((function(_this) {
        return function() {
          return _this.setState({
            gameState: "progress"
          });
        };
      })(this), 0);
    },
    render: function() {
      var board, startScreen;
      startScreen = StartScreen({onStart: this.start});
      board = Board({black: this.black, white: this.white, onReset: this.reset, onReplay: this.replay});
      return (
                React.DOM.div(null, 
                    this.state.gameState == "start" && startScreen, 

                    this.state.gameState == "progress" && board

                )
            );
    }
  });
});
