interface DatabaseManager {
	init(): Promise<boolean>;

	close(): Promise<boolean>;

	// query(query: string, values: string[]): Promise<Object[] | null>;

	// beginTransaction(): Promise<boolean>;

	// commit(): Promise<boolean>;

	// rollback(): Promise<boolean>;
}

export default DatabaseManager;
