interface _Env {
	port: number;
	databaseHost: string;
	databasePort: number;
	databaseDbName: string;
	databaseUser: string;
	databasePassword: string;
	frontendAddress: string
}

export type Env = Readonly<_Env>;
