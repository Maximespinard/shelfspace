declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
  }
}
