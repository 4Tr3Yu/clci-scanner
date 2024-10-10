export interface VisitorAccessLog {
	date_entry: string;
	date_exit?: string;
	car_plate: string;
	list_category: string;
	incidents: string;
	note1: string;
	note2: string;
	visitor: Visitor;
}

export interface Visitor {
	rut: string;
	rut_name: string;
	rut_validation: string;
}

export interface ScanResult {
	RUN: string;
	serial: string;
}