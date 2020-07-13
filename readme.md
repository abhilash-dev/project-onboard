# Project-Onboard

## Back-end API specifications

### Project

-   List all projects for a user
    -   Authenticated users only
    -   filter by data-type (numerical / text / image)
    -   filter by problem-type (object-detection / classification/ text-classification)
    -   filter by data-source (on-prem / Alectio's data resource)
    -   Pagination
    -   Limit the no. of results
-   Create a new project
    -   Authenticated users only
    -   Project Name has to be unique for a user
    -   Field Validation via Mongoose
-   Get a single project by project Name
    -   Authenticated users only
-   Update a project by project Name
    -   Authenticated users only
    -   Validation on update
-   Remove / Delete a project by project Name
    -   Authenticated users only

### Users and Authentication

-   Implement Authentication using JWT
    -   JWT should expire within 30 days
-   User Registration
    -   A token with a cookie (token = xyz) should be sent after registration
    -   Passwords must be hashed
-   User Login
    -   login with email and password
    -   successful only when hash of plain-text password matches the registered hashed password
    -   A token with a cookie (token = xyz) should be sent after login
-   User Logout
    -   set token = ""
-   Get User
    -   get the current user by token
-   Password Reset
    -   User can request to reset password
    -   Hashed token will be emailed to the registered email
    -   A put request made to the generated URL with the updated password to update the credentials
    -   The generated token via email will expire in 10 mins
-   Update User info.
    -   Authenticated users only
    -   Password cannot be updated & should be done using password reset


### Security
- Encrypt passwords & reset auth tokens
- prevent NoSQL injections
- prevent cross site scripting
- prevent http param pollution
- Use cors to make API public (Only on dev environment)

### Documentation
- Use Postman to create REST API documentation
- Use docgen to generate documentation files as HTML
- Host the REST API docs at /api/documentation


[/api/vi/docs - REST API docs public link](https://documenter.getpostman.com/view/1346176/T17Na52o?version=latest)