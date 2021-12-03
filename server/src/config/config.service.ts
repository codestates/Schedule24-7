import * as dotenv from "dotenv";

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }
  public get(key: string): string {
    return this.envConfig[key];
  }

  public getEmailAddressConfig(): string {
    return this.get("EMAIL_ADDRESS");
  }
  public getEmailHostConfig(): string {
    return this.get("EMAIL_HOST");
  }
  public getEmailUserConfig(): string {
    return this.get("EMAIL_USER");
  }
  public getEmailPasswordConfig(): string {
    return this.get("EMAIL_PASSWORD");
  }

  public getSecretConfig() {
    return this.get("SECRET");
  }

  public async getPortConfig() {
    return this.get("PORT");
  }
  public async getMongoConfig() {
    return {
      uri:
        "mongodb+srv://" +
        this.get("MONGO_USER") +
        ":" +
        this.get("MONGO_PASSWORD") +
        "@" +
        this.get("MONGO_HOST") +
        "/" +
        this.get("MONGO_DATABASE") +
        "?retryWrites=true&w=majority",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
