FROM mcr.microsoft.com/dotnet/aspnet:9.0@sha256:86085bc68dde4a8cdfd8c2342acc3bf843eade855092879a85e3f3adb56e55c7 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:24fe7c00719afc72e2b67cace264dea2ee39ae45f5b553bd59493fe3ddfc920f AS build
WORKDIR /src
COPY ["Directory.Build.props", "."]
COPY ["src/DeveloperTools.Api/DeveloperTools.Api.csproj", "src/DeveloperTools.Api/"]
COPY ["src/DeveloperTools.Application/DeveloperTools.Application.csproj", "src/DeveloperTools.Application/"]
COPY ["src/DeveloperTools.Core/DeveloperTools.Core.csproj", "src/DeveloperTools.Core/"]
COPY ["src/DeveloperTools.Infrastructure/DeveloperTools.Infrastructure.csproj", "src/DeveloperTools.Infrastructure/"]
COPY ["src/DeveloperTools.Api/packages.lock.json", "src/DeveloperTools.Api/"]
COPY ["src/DeveloperTools.Application/packages.lock.json", "src/DeveloperTools.Application/"]
COPY ["src/DeveloperTools.Core/packages.lock.json", "src/DeveloperTools.Core/"]
COPY ["src/DeveloperTools.Infrastructure/packages.lock.json", "src/DeveloperTools.Infrastructure/"]
RUN dotnet restore "src/DeveloperTools.Api/DeveloperTools.Api.csproj" --locked-mode
COPY ["src/", "src/"]
WORKDIR "/src/src/DeveloperTools.Api"
RUN dotnet build "DeveloperTools.Api.csproj" -c Release -o /app/build --no-restore

FROM build AS publish
RUN dotnet publish "DeveloperTools.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
USER $APP_UID
ENTRYPOINT ["dotnet", "DeveloperTools.Api.dll"]
