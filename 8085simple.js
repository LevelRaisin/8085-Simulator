CodeMirror.defineSimpleMode("8085", {
	start: [
		{regex: /\bcmp|CMP|cpi|CPI|nop|NOP|hlt|HLT\b/, token: "keyword"},
		{regex: /\bdi|DI|ei|EI|rim|RIM|sim|SIM\b/, token: "error"},
		{regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
		{regex: /\b([A-La-l]|SP|sp|PC|pc)\b/, token: "builtin"}
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