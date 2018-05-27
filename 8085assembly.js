(function(CodeMirror) {
	"use strict";
	let reserve = "><+-.,[]".split("");
	CodeMirror.defineMode("8085assembly", function() {
		return {
			startState: function() {
				return {
					commentLine: false,
					left: 0,
					right: 0,
					commentLoop: false
				}
			},
			token: function(stream, state) {
				if (stream.eatSpace()) return null;
				if (stream.sol()) {
					state.commentLine = false;
				}
				const ch = stream.next().toString();
				if (reserve.indexOf(ch) !== -1) {
					if (state.commentLine === true) {
						if (stream.eol()) {
							state.commentLine = false;
						}
						return "comment";
					}
					if (ch === "]" || ch === "[") {
						if (ch === "[") {
							state.left++;
						} else {
							state.right++;
						}
						return "bracket";
					}
					else if (ch === "+" || ch === "-") {
						return "keyword";
					}
					else if (ch === "<" || ch === ">") {
						return "atom";
					}
					else if (ch === "." || ch === ",") {
						return "def";
					}
				}
				else {
					state.commentLine = !stream.eol();
					return "comment";
				}
				if (stream.eol()) {
					state.commentLine = false;
				}
			}
		};
	});
	CodeMirror.defineMIME("text/x-8085assembly", "8085assembly")
});