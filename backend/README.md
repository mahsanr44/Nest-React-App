# Controllers
- Responsible for handling incoming requests and returning responses to the client.
- Routes in Controllers after localhost
- Request and Response Handler

# Services
- Service are responsible for data storage and retrieval, and used by the controller to handle requests.

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
* Guards are executed after all middleware, but before any interceptor or pipe.
