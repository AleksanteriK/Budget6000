# Budget6000

## Servu

### Jos haluut ajaa servua, tarviit seuraavat NUGET paketit:
-MongoDB.driver

-JWT

-Microsoft.AspNetCore.Authentication.JwtBearer

-Microsoft.IdentityModel.Tokens

-System.IdentityModel.Tokens.Jwt

-BCrypt.Net-Next

-DotNetEnv

-Microsoft.AspNetCore.Authentication.JwtBearer

## Aja seuraavat komennot cmd / pwrshell

```console
dotnet add package MongoDB.Driver

dotnet add package JWT --version 11.0.0

dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 9.0.4

dotnet add package Microsoft.IdentityModel.Tokens --version 8.8.0

dotnet add package System.IdentityModel.Tokens.Jwt --version 8.8.0

dotnet add package BCrypt.Net-Next --version 4.0.3

dotnet add package DotNetEnv --version 3.1.1

dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0

```

### .env

Tarviit myös .env tiedoston, jossa on database connection string ja JWT token secret key

Pitää olla muotoa:

MONGODB_CONNECTION_STRING=< connection string >

JWT_SECRET_KEY=< secret key >

### Servu kuuntelee porttia 5000 lokaalisti

```console
dotnet build
dotnet run
```
