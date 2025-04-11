# Budget6000

## Servu

### Jos haluut ajaa servua, tarviit seuraavat NUGET paketit:
-MongoDB.driver

-JWT

-Microsoft.AspNetCore.Authentication.JwtBearer

-Microsoft.IdentityModel.Tokens

## Aja seuraavat komennot cmd / pwrshell

```console
dotnet add package MongoDB.Driver

dotnet add package JWT --version 11.0.0

dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 9.0.4

dotnet add package Microsoft.IdentityModel.Tokens --version 8.8.0
```

### Servu kuuntelee porttia 5000 lokaalisti

```console
dotnet build
dotnet run
```
