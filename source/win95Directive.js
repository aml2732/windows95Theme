module.exports = function() {
    return {
        scope: {
          "subject": "=subject"
        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}
