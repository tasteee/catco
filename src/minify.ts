export function minify(content: string): string {
	return content
		.replace(/\s+/g, " ") // Replace all whitespace sequences with a single space
		.replace(/\s*([\{\}\[\]\(\),;:])\s*/g, "$1") // Remove spaces around brackets, braces, commas, semicolons, and colons
		.replace(/\s*=\s*/g, "=") // Remove spaces around equals signs
		.replace(/\s*>\s*/g, ">") // Remove spaces around greater than signs
		.replace(/;\s*/g, ";") // Remove spaces after semicolons
		.replace(/"\s+/g, '"') // Remove spaces after opening quotes
		.replace(/\s+"/g, '"') // Remove spaces before closing quotes
		.replace(/'\s+/g, "'") // Remove spaces after opening single quotes
		.replace(/\s+'/g, "'") // Remove spaces before closing single quotes
		.trim(); // Remove leading and trailing whitespace
}
