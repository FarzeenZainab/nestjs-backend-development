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

What is dependency injection?
DI = Giving (injecting) an object its dependencies instead of creating them manually inside the class.
NestJS automatically provides dependencies via the constructor.

- Imagine you're building a CarService class

- To drive the car, you need an engine - but instead of building the engine yourself, someone gives you
  a ready-made engine.

- That 'someone' is NestJS - this is called dependency injection

In technical terms:
DI is a design pattern where a class (like CarService) does not create its own dependencies (like EngineService) - instead NestJS
inject these dependencies into it.

WITHOUT DI (BAD):

```ts
export class CarService {
  private engine = new EngineService(); // tight coupling, hard to test and change
}
```

WITH DI:

```ts
@injectable()
export class CarService {
  constructor(private engine: EngineService) {} // DI - EngineService injected
}
```

WHY DI IS IMPORTANT:

1. Loose coupling: The class doesn't care where the dependency comes from - just that it works

2. Easier to test: You can inject a fake or mock dependency during testing

3. Easier to maintain: You can replace a service easily without changing the dependent class

4. Separation of concerns: Each class focuses only on its own work - not the creation of dependencies

HOW DI WORKS IN NESTJS (BEHIND THE SCENES):
NestJS uses a dependency injection container:

Step 1: You mark a class as injectable()
Step 2: You register it in Module providers
Step 3: NestJS builds that class and saves it in the container
Step 4: When another class needs it, NestJS gives the ready-made version from the container

HOW NESTJS DECIDES WHAT TO INJECT? (IMPORTANT)

- By Type in constructor:
  NestJS looks at the type declared in the constructor to know what to inject

```ts
  constructor(private engine: EngineService){}
```

- The container checks:
  "Do I have an EngineService in my providers? Yes? Ok - inject it"

DI EXAMPLE EXPANDED: MULTIPLE SERVICES

```ts
@injectable()
export class EngineService {
  start() {
    return `Engine started`;
  }
}

@injectable()
export class FuelService {
  getFuel() {
    return `Fuel Added`;
  }
}

@injectable
class CarService {
  constructor(
    private engine: EngineService,
    private fuel: FuelService,
  ) {}

  drive() {
    return `${this.fuel.getFuel()} - ${this.engine.start()} - Car driving`;
  }
}
```

```pgsql
NestJS injects both EngineService and FuelService into CarService automatically.
Class marked as @Injectable()
      ↓
Added to Module's providers array
      ↓
NestJS creates instance (in DI container)
      ↓
Injects it into constructor of dependent class
      ↓
Ready to use (No manual 'new' needed!)
```

DO I NEED TO USE PRIVATE / PROTECTED KEYWORDS WHEN INJECTING DEPENDENCIES
