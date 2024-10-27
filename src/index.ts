#!/usr/bin/env bun

import { globby } from "globby";
import fs from "node:fs";
import path from "node:path";
import clipboard from "clipboardy";
import { minify } from "./minify";

async function catco(patterns: string[]) {
	let allContents = "";

	for (const pattern of patterns) {
		const files = await globby(pattern);
		for (const file of files) {
			const content = await fs.promises.readFile(file, "utf-8");
			const minifiedContent = minify(content);
			allContents += `/* FILE: ${path.resolve(file)} */ ${minifiedContent} `;
		}
	}

	if (allContents) {
		await clipboard.write(allContents);
		console.log("Contents copied to clipboard!");
	} else {
		console.log("No matching files found.");
	}
}

const args = process.argv.slice(2);
if (args.length === 0) {
	console.log("Usage: catco [...patterns]");
	process.exit(1);
}

catco(args);
