import type { VisitorAccessLog } from "./types.ts";
export const saveLog = async (log: VisitorAccessLog) => {
	try {
	  	const response = await fetch("/api/logs/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(log),
		});

		if (!response.ok) {
			throw new Error("Failed to save log");
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
