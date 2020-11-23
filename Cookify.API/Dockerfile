FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app 

# Copy everything and build
COPY . ./
# You can point directly at your csproj file, specially if it's on a sub-folder
# On some .Net Core projects (MVC, usually) if you don't add --runtime linux-x64, it won't publish. See note (1)
RUN dotnet publish -c Release -o out *.csproj --runtime linux-x64 

# Build runtime image
FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /app
COPY --from=build-env /app/out . 

# Change the name of the app here if needed (TestApp)
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Cookify.API.dll