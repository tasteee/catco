import { describe, it, expect } from "vitest";
import { minify } from "../minify";

describe("minify", () => {
	it("should remove all unnecessary whitespace", () => {
		const input = `
      function example() {
        console.log("Hello,   World!");
        return true;
      }
    `;
		const expected =
			'function example(){console.log("Hello,World!");return true;}';
		expect(minify(input)).toBe(expected);
	});

	it("should handle JSON-like structures", () => {
		const input = `
      {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
      }
    `;
		const expected = '{"name":"John Doe","age":30,"city":"New York"}';
		expect(minify(input)).toBe(expected);
	});

	it("should remove spaces in string literals", () => {
		const input = `const greeting = "Hello,   World!";`;
		const expected = 'const greeting="Hello,World!";';
		expect(minify(input)).toBe(expected);
	});

	it("should handle complex nested structures", () => {
		const input = `
      function complexFunction(a, b) {
        if (a > b) {
          return {
            result: true,
            message: "A is greater"
          };
        } else {
          return {
            result: false,
            message: "B is greater or equal"
          };
        }
      }
    `;
		const expected =
			'function complexFunction(a,b){if(a>b){return{result:true,message:"A is greater"};}else{return{result:false,message:"B is greater or equal"};}}';
		expect(minify(input)).toBe(expected);
	});

	it("should handle multiple consecutive spaces", () => {
		const input = "const   x   =   5;";
		const expected = "const x=5;";
		expect(minify(input)).toBe(expected);
	});

	it("should remove newlines", () => {
		const input = "const x = 5;\nconst y = 10;";
		const expected = "const x=5;const y=10;";
		expect(minify(input)).toBe(expected);
	});
});
