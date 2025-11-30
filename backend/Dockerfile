FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/DeveloperTools.Api/DeveloperTools.Api.csproj", "src/DeveloperTools.Api/"]
COPY ["src/DeveloperTools.Application/DeveloperTools.Application.csproj", "src/DeveloperTools.Application/"]
COPY ["src/DeveloperTools.Core/DeveloperTools.Core.csproj", "src/DeveloperTools.Core/"]
COPY ["src/DeveloperTools.Infrastructure/DeveloperTools.Infrastructure.csproj", "src/DeveloperTools.Infrastructure/"]
RUN dotnet restore "src/DeveloperTools.Api/DeveloperTools.Api.csproj"
COPY . .
WORKDIR "/src/src/DeveloperTools.Api"
RUN dotnet build "DeveloperTools.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DeveloperTools.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DeveloperTools.Api.dll"]
