import type { ScanResult, VisitorAccessLog } from "./types";
export function decodeUrl(url: string): ScanResult {
	const decodedUrl = new URL(url);
	const params = new URLSearchParams(decodedUrl.search);
	const data = Object.fromEntries(params.entries());
	const resultData: ScanResult = {
		RUN: data.RUN || '',
		serial: data.serial || ''
	};
	return resultData;
}

export function formatSaveLogRequest(visitor: ScanResult | null, extraData: { car: string; category: string; incidentes: string; note1: string; note2: string; }): VisitorAccessLog {
	const log: VisitorAccessLog = {
		date_entry: new Date().toISOString(),
		car_plate: extraData.car,
		list_category: extraData.category,
		incidents: extraData.incidentes,
		note1: extraData.note1,
		note2: extraData.note2,
		visitor: {
			rut: visitor.RUN,
			rut_name: '',
			rut_validation: visitor.serial
		}
	};
	return log;
}

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