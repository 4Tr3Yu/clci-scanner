export interface VisitorAccessLog {
	date_entry: string;
	date_exit: string;
	car_plate: string;
	list_category: string;
	incidents: string;
	note1: string;
	note2: string;
	visitor: string;
}

export interface Visitor {
	id: string;
	rut: string;
	rut_name: string;
	rut_validation: string;
}

export interface ScanResult {
	RUN: string;
	serial: string;
	mrz: string;
	type: string;
}