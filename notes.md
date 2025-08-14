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
No, you don't have to use private or protected keywords when injecting dependencies in NestJS. However, it's a common practice to use them for encapsulation and to indicate that these dependencies should not be accessed outside the class.

No, you don't have to - but you usually should

Here's why:

1. When you use `private` or `public` or `protected`

```ts
constructor(private engine: EngineService){}
```

You are doing two things at the same time:

a. Asking NestJS to inject EngineService (DI)
b. Automatically creating a class property called `this.engine` you can use inside the class

2. What happens if you DON'T use private?

- Nestjs will still inject EngineService - no error
- But you won't have access to this.engine inside the class methods because you didn't store it as a class property

Example - this will break:

```ts
drive() {
  return this.engine.start(); // Error: 'engine' does not exist on 'this'
}
```

3. When is it OK to skip `private`?
   If you only need the dependency temporarily in the constructor and don't need to use it in other methods:

```ts
  constructor(engine: EngineService){
    console.log(engine.start())
  }
```

CONTROLLERS:
Handles incoming requests and return responses.

Method Decorators → @Get, @Post, @Delete, @Patch, @Put

WORKING DYNAMIC ROUTES USING @PARAMS DECORATOR IN CONTROLLERS:
When we want the clients access to a specific resource, whether to fetch this resource or to maybe delete it, we should use dynamic routes.

It we return a collection, we can identify it as tasks. But if we want t a particular resource then the part after the last slash is a parameter is an argument → /tasks/11 to the route that needs to be dynamic.

This, we need to somehow be able to define that route that will catch some specific parameted in a method decorator (@Get, @Post).

```ts
@Get('/:id')
public findOne(@Param() params: any): string{
  return params.id
}
```

if we have only one parameter we can also write the method as such:

```ts
@Get('/:id')
public findOne(@Params('id') id: string): string{
  return id;
}
```

CAVEATS:
The order in with methods are defined in a controller matters.
In NestJS you can also make parameters optional so that they don't have to be provided and the route will still be matched. So if we move the dynamic route to the top and make the id paramter optional then the response will not be what we expect.

Question mark marks the paramter optional in route.

NestJS will catch the id route if I hit '/tasks' becuase it matched this route first.

### SERVICES AND DTO FILES:

```
nest g servive service-name molue-name --no-spec --flat
```

The above command will create a service in the defined module with no spec file (test file) and --flat will not create another folder for the service.

Before working with services we should model the data to defined how the data should look like and how to work it. We can do it by creating a model file and define the structure of the data.

Once we create a reusable service we can inject in our controller.

A reusable service is useful to import and use business logic for example tasks in multiple controllers.

This pattern isolates the business logic.

### ERROR HANDLING

we need to deal with the errors occured during data processing, for example we need to thorw a not found exception when the data is not found. NestJS provides these exceptions and these are built into the system.

NestJS by default has an exception filter when lets nest return meaningful response for unhandeled errors.

We can also create our own exception filters for unhandled exceptions.
