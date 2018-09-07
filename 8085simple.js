CodeMirror.defineSimpleMode("8085", {
	start: [
		{regex: /push|PUSH|pop|POP|nop|NOP|hlt|HLT/, token: "keyword"},
		{regex: /di|DI|ei|EI|rim|RIM|sim|SIM/, token: "error"},
		{regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
		{regex: /(?!\w)([A-F]|[a-f])(?!\w)/, token: "builtin"}
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