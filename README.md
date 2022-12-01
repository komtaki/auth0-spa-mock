# auth0-spa-mock

ローカルやCIのために、Auth0 SPAの認証をモックするAPIコンテナ

https://qiita.com/komtaki/private/42da4a84dc086edb52ee

[OpenAPI Spec](/app/openapi.yml)

## How to use

### Generate Certification

```
cd app/config

openssl genrsa 2048 > private.key
openssl req -new -key private.Key -out server.csr
openssl x509 -in server.csr -out public.crt -req -signkey private.key -days 3650
```

### Docker build

```
docker build -t komtaki/auth0-spa-mock:latest .

docker run -e AUTH0_ISSUER="https://auth0" -e USER_MAIL_ADDRESS="hoge@example.com" -e USER_SUID="auth0|su4wrufhsjkdnfs" komtaki/auth0-spa-mock:latest
```