FROM mcr.microsoft.com/dotnet/aspnet:10.0@sha256:207cc51496778557731c81ff670333d8ade4a4fec22768fd1be8e78474a84ecf AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0@sha256:e1fc6e423f543119c406d24e2e687d67c569f18f04a37a8b0005d80ad0dcee80 AS build
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
