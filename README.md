# @n4it/api-key
A NestJS module for creating and validating API keys effortlessly, leveraging JWT tokens and customizable policies.

## Installation
To install the module, use npm:

```bash
npm install @n4it/api-key
```

## Usage

### Importing and Configuring the Module
First, import the ApiKeyModule into your NestJS module and configure it using the `register` method. This method requires a secret for signing the JWT tokens and an apiKeyHeader for identifying the API key in requests.

```typescript
import { ApiKeyModule } from "@n4it/api-key";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ApiKeyModule.register({
      secret: "your-secret-key",  // Replace with your actual secret
      apiKeyHeader: "x-api-key",  // The header to look for the API key
      expiresIn: 60 * 60, // the time the API Keys will expire
    }),
  ],
})
export class AppModule {}
```

### Generating API Tokens
To generate an API token, inject the ApiKeyService into your service and use the createApiKey method. This method allows you to associate policies with the generated token.

```typescript
import { ApiKeyService } from "@n4it/api-key";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  public createToken() {
    return this.apiKeyService.createApiKey({
      policies: ["user:manage"],  // Define your custom claims here
      role: "admin"
    });
  }
}
```

### Using the API Key Strategy in Guards
To protect routes using the generated API keys, you can use the `API_KEY_MODULE_STRATEGY` with NestJS's AuthGuard. This guard will automatically validate incoming requests against the configured API key strategy.

```typescript
import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { API_KEY_MODULE_STRATEGY } from "@n4it/api-key";

@Injectable()
export class AuthGuard extends PassportAuthGuard([
  API_KEY_MODULE_STRATEGY,  // inject the strategy in a passport auth guard
  // other auth mechanisms can be added here as well...
]) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
```

### Using the ApiKeyClient Decorator
The module also provides a convenient `ApiKeyClient` decorator. This decorator can be used in your controllers to directly inject the parsed JWT token as an `AuthenticatedClient` object. This makes it easy to access the details of the authenticated client in your route handlers.

You can import both `ApiKeyClient` and `AuthenticatedClient`:

```typescript
import { Controller, Get } from "@nestjs/common";
import { ApiKeyClient, AuthenticatedClient } from "@n4it/api-key";

@Controller('user')
export class UserController {
  @Get('profile')
  getUserProfile(@ApiKeyClient() client: AuthenticatedClient) {
    // Access client details from the parsed JWT token
    // possibly validate the policies
    return {
      userId: client.userId,
      policies: client.policies,
    };
  }
}
```

### Example Guard Usage
Once you've created the AuthGuard, you can apply it to your controllers or specific routes to enforce API key validation.

```typescript
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard)
  getProtectedResource() {
    return "This is a protected resource";
  }
}
```

## License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue on GitHub.

## Support
If you have any questions or need support, you can contact us at [info@n4it.nl](mailto:info@n4it.nl).
