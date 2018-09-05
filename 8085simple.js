CodeMirror.defineSimpleMode("8085", {
	// The start state contains the rules that are intially used
	start: [
		// The regex matches the token, the token property contains the type
		{regex: /push|pop/, token: "keyword"},
	],
	// The multi-line comment state.
	comment: [
		{regex: /.*?\*\//, token: "comment", next: "start"},
		{regex: /.*/, token: "comment"}
	],
	meta: {
		dontIndentStates: ["comment"],
		lineComment: "//"
	}
});