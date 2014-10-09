/** @jsx React.DOM */

define(["react", "./BoardCell.js", "./StatusBar.js"], function(React, Cell, StatusBar) {
  return React.createClass({
    componentWillMount: function() {
      var i, j, _i, _results;
      this.boardMatrix = [];
      _results = [];
      for (i = _i = 0; _i < 15; i = ++_i) {
        this.boardMatrix[i] = [];
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (j = _j = 0; _j < 15; j = ++_j) {
            _results1.push(this.boardMatrix[i][j] = {
              content: "empty",
              winning: false
            });
          }
          return _results1;
        }).call(this));
      }
      return _results;
    },
    getInitialState: function() {
      return {
        currentPlayer: "black",
        count: 0,
        gameState: "progress"
      };
    },
    checkWinningPosition: function(x, y) {
      var bottom, getNeighbors, highlight, left, leftBottom, leftTop, right, rightBottom, rightTop, top;
      getNeighbors = (function(_this) {
        return function(bottomDirection, rightDirection) {
          var i, j, neighbors;
          neighbors = 0;
          i = x + bottomDirection;
          j = y + rightDirection;
          while (i >= 0 && i < 15 && j >= 0 && j < 15) {
            if (_this.boardMatrix[i][j].content === _this.state.currentPlayer) {
              neighbors++;
            } else {
              break;
            }
            i += bottomDirection;
            j += rightDirection;
          }
          return neighbors;
        };
      })(this);
      highlight = (function(_this) {
        return function(bottomDirection, rightDirection) {
          var i, j, _results;
          _this.boardMatrix[x][y].winning = true;
          i = x + bottomDirection;
          j = y + rightDirection;
          _results = [];
          while (i >= 0 && i < 15 && j >= 0 && j < 15) {
            if (_this.boardMatrix[i][j].content === _this.state.currentPlayer) {
              _this.boardMatrix[i][j].winning = true;
            } else {
              break;
            }
            i += bottomDirection;
            _results.push(j += rightDirection);
          }
          return _results;
        };
      })(this);
      left = getNeighbors(0, -1);
      right = getNeighbors(0, 1);
      top = getNeighbors(-1, 0);
      bottom = getNeighbors(1, 0);
      leftTop = getNeighbors(-1, -1);
      rightBottom = getNeighbors(1, 1);
      rightTop = getNeighbors(-1, 1);
      leftBottom = getNeighbors(1, -1);
      if (left + right >= 4) {
        highlight(0, -1);
        highlight(0, 1);
        this.setState({
          gameState: "win"
        });
        return true;
      } else if (top + bottom >= 4) {
        highlight(-1, 0);
        highlight(1, 0);
        this.setState({
          gameState: "win"
        });
        return true;
      } else if (leftTop + rightBottom >= 4) {
        highlight(-1, -1);
        highlight(1, 1);
        this.setState({
          gameState: "win"
        });
        return true;
      } else if (rightTop + leftBottom >= 4) {
        highlight(-1, 1);
        highlight(1, -1);
        this.setState({
          gameState: "win"
        });
        return true;
      }
    },
    move: function(x, y) {
      this.setState({
        count: this.state.count + 1
      });
      if (this.state.count + 1 === 15 * 15) {
        this.setState({
          gameState: "even"
        });
      }
      if (!this.checkWinningPosition(x, y)) {
        if (this.state.currentPlayer === "black") {
          this.boardMatrix[x][y].content = "black";
          return this.setState({
            currentPlayer: "white"
          });
        } else {
          this.boardMatrix[x][y].content = "white";
          return this.setState({
            currentPlayer: "black"
          });
        }
      }
    },
    render: function() {
      var cells, i, j, rows, _i, _j;
      rows = [];
      for (i = _i = 0; _i < 15; i = ++_i) {
        cells = [];
        for (j = _j = 0; _j < 15; j = ++_j) {
          cells.push(Cell({x: i, y: j, player: this.state.currentPlayer, winning: this.boardMatrix[i][j].winning, gameState: this.state.gameState, 
                        onMove: this.move}));
        }
        rows.push(React.DOM.div({className: "board-row"}, cells));
      }
      return (
                React.DOM.div({className: "board"}, 
                    StatusBar({onReset: this.props.onReset, onReplay: this.props.onReplay, player: this.state.currentPlayer == "black" ? this.props.black : this.props.white, gameState: this.state.gameState}), 
                    rows
                )
            );
    }
  });
});
