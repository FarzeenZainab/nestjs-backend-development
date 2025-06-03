NPM commands inside package.json:

start → transpile our code and starts the project but will not re-execute if the code changes
start:dev → this command watches changes
start:debug → same as start:dev but you can additionally attach a debugger

DIFFERENCE BETWEEN CONTROLLER VS SERVICE VS MODULE
The terms controller, service and module represents different layers of responsibilities in an application.

CONTROLLER:

Purpose: Handles incoming HTTP requests and return responses.
Responsibility: Acts as an interface between the client (frontend / external API consumer) and the server
Example: Handles routing, extracts parameters from the requests, and delegates business logic to the service.

```tsx
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }
}
```

SERVICES:
Purpose: contains business logic and data processing
Responsibility: Does the actual work like talking to the database, performing calculations, validations, etc
Example: One service method might fetch data from a database and apply some logic before returning it to the controller

```tsx
@Injectable()
export class UsersService {
  getAllUsers() {
    return ['John', 'Jane']; // Imagine this came from a database
  }
}
```

MODULE:
Purpose: Organizes related components (controllers, services, etc) into a cohesive unit
Responsibility: Tells the framework how pieces of the application fits together - what is available for dependency injection and
what can be exported for other modules to use.
Example: Binds together controller and service, and optionally imports or exports other modules

```tsx
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

DEPENDENCY INJECTION:
