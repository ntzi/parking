import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const env = process.env.NODE_ENV || "local";

const config = () => {
	return {
		local: {
			nodeEnv: "local",
			api: {
				port: 4000,
			},
			logs: {
				level: "info",
			},
			databases: {
				postgres: {
					host: "postgres", // postgres, localhost
					port: "5432", // 5432, 5779
					username: "admin",
					password: "password",
					database: "parking",
					migrations: ["src/api/migrations/**/*.{ts,js}"],
					entities: ["src/api/models/**/*.{ts,js}"],
					synchronize: true,
					logging: false,
				},
			},
			auth: {
				privateKey: process.env.JWT_PRIVATE_KEY
			}
		},

		test: {
			nodeEnv: "test",
			api: {
				port: 4000,
			},
			databases: {
				postgres: {
					host: "postgres-test", //postgres-test
					port: "5432", //5432
					username: "admin",
					password: "password",
					database: "parking",
					migrations: ["src/api/migrations/**/*.{ts,js}"],
					entities: ["src/api/models/**/*.{ts,js}"],
					synchronize: true,
					logging: false,
				},
			},
			auth: {
				privateKey: process.env.JWT_PRIVATE_KEY
			}

		},

		testLocal: {
			nodeEnv: "testLocal",
			api: {
				port: 4000,
			},
			databases: {
				postgres: {
					host: "localhost",
					port: "5779",
					username: "admin",
					password: "password",
					database: "parking",
					migrations: ["src/api/migrations/**/*.{ts,js}"],
					entities: ["src/api/models/**/*.{ts,js}"],
					synchronize: true,
					logging: false,
				},
			},
			auth: {
				privateKey: process.env.JWT_PRIVATE_KEY
			}

		},

		development: {
			nodeEnv: "development",
			api: {
				port: 3000,
			},
			logs: {
				level: "info",
			},
			databases: {
				postgres: {
					host: "/cloudsql/parking-development:europe-west1:parking-development",
					port: "5432",
					username: "admin",
					password: process.env.POSTGRES_PASSWORD,
					database: "parking",
					migrations: ["build/src/api/migrations/**/*.{ts,js}"],
					entities: ["build/src/api/models/**/*.{ts,js}"],
					synchronize: true,
					logging: false,
				},
			},
		},

		staging: {
			nodeEnv: "staging",
			api: {
				port: 3000,
			},
			logs: {
				level: "info",
			},
			databases: {
				postgres: {
					host: "/cloudsql/parking-staging:europe-west1:parking-staging",
					port: "5432",
					username: "admin",
					password: process.env.POSTGRES_PASSWORD,
					database: "parking",
					migrations: ["build/src/api/migrations/**/*.{ts,js}"],
					entities: ["build/src/api/models/**/*.{ts,js}"],
					synchronize: true,
					logging: false,
				},
			},
		},

		production: {
			nodeEnv: "production",
			api: {
				port: process.env.PORT,
			},
			databases: {
				postgres: {
					host: "/cloudsql/parking-production:europe-west1:parking-production",
					port: "5432",
					username: "admin",
					password: process.env.POSTGRES_PASSWORD,
					database: "parking",
					migrations: ["build/src/api/migrations/**/*.{ts,js}"],
					entities: ["build/src/api/models/**/*.{ts,js}"],
					synchronize: false,
					logging: false,
				},
			},
		},
	};
};

export default config()[env];
