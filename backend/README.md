# Controllers
- Responsible for handling incoming requests and returning responses to the client.
- Routes in Controllers after localhost
- Request and Response Handler

# Services
- Services are responsible for data storage and retrieval, and used by the controller to handle requests.

# Modules
- Modules are containers for different parts of an application, such as controllers, services,  and other related components.
- They serve as a way to organize and encapsulate the functionality of an application.

# Middleware
- Middleware can be used to add logging and authentication functionality.
- Have access to request and response objects

# Exception Filters
- Responsible for processing all unhandled exceptions across an application. 

# DTO (Data Transfer Object) 
- A DTO is an object that defines how the data will be sent/post over the network.

# Pipes
- transformation: transform input data to the desired form (e.g., from string to integer)
- Validation 

# Guards
- This is often referred to as authorization. 
* Guards are executed after all middleware but before any interceptor or pipe.

# Others

-  Entity is Like Schema
-In NestJS, the `@Injectable()` decorator is used to define a class as a provider or service. 
- `controller` handles the HTTP request and response logic, while the `service` handles the business logic related to "todos"
- If you don't write a constructor in your service files, NestJS will not be able to inject the `todoRepository` dependency correctly, causing runtime errors. Constructors are essential for enabling dependency injection in NestJS services.
- When you inject dependencies into a service, you use the `this` keyword to access those dependencies within the service methods. 
-  A `repository` is a class provided by TypeORM that acts as an intermediary between your application and the database.
- `Entity manager` supposed to work with any entity, automatically find its repository and call its methods, whatever entity type are you passing.