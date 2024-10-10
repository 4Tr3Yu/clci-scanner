import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Visitor, VisitorAccessLog } from "../../../lib/types";

async function checkVisitorStatus(visitor: Visitor): Promise<string> {
	try {
		const { data, error } = await supabase
			.from("visitors")
			.select("id")
			.eq("rut", visitor.rut)
			.single(); // Use .single() to get one record instead of an array

		if (error && error.code !== 'PGRST116') { // Allow "no match found" error
			throw new Error(`Error checking visitor: ${error.message}`);
		}

		if (!data) {
			const { data: newVisitor, error: insertError } = await supabase
				.from("visitors")
				.insert([visitor])
				.single(); 

			if (insertError) {
				throw new Error(`Error inserting visitor: ${insertError.message}`);
			}

			return newVisitor.id; 
		}

		
		return data.id;

	} catch (err) {
		throw new Error(err instanceof Error ? err.message : "Unknown error occurred");
	}
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const visitorAccess = await request.json();
		const { visitor, visitorAccessLog }: { visitor: Visitor, visitorAccessLog: VisitorAccessLog } = visitorAccess;

		if (!visitor || !visitorAccessLog) {
			return new Response("Missing visitor or visitorAccessLog data", { status: 400 });
		}

		const visitorId = await checkVisitorStatus(visitor);

		const { data: accessLogData, error: accessLogError } = await supabase
			.from("visitor_access")
			.insert([{ ...visitorAccessLog, visitor: visitorId }]) 
			.single();

		if (accessLogError) {
			throw new Error(`Error inserting visitor access log: ${accessLogError.message}`);
		}

		return new Response(JSON.stringify({ data: accessLogData }), { status: 200 });

	} catch (error) {
		return new Response(error instanceof Error ? error.message : "Internal Server Error", { status: 500 });
	}
};
