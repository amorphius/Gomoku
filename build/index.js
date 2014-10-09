/** @jsx React.DOM */

define(["react", "./GameObj.js"], function(React, Game) {
  return React.renderComponent(Game(null), document.getElementById("app"));
});
