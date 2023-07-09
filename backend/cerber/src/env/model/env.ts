interface _Env {
	port: number;
	databaseHost: string;
	databasePort: number;
	databaseDbName: string;
	databaseUser: string;
	databasePassword: string;
	jwtSecret: string;
	jwtExpirationTime: number;
	allowedCorsAddresses: string[]
}

export type Env = Readonly<_Env>;
