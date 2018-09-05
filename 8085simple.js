CodeMirror.defineSimpleMode("8085", {
	// The start state contains the rules that are intially used
	start: [
		// The regex matches the token, the token property contains the type
		{regex: /push|PUSH|pop|POP|nop|NOP|hlt|HLT/, token: "keyword"},
		{regex: /di|DI|ei|EI|rim|RIM|sim|SIM/, token: "error"},
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