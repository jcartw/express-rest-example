# express-rest-example

Express REST Server Example

# Build docker images and run containers

- build dev image: `docker build --tag example/dev:1.00 --file ./docker/dev/Dockerfile ./docker/dev`

# MySQL Container

- build mysql image: `docker build --tag example/mysql:1.00 --file ./docker/mysql/Dockerfile ./docker/mysql`
- run container interactively:

```
docker run \
--detach \
--name=mysql_cont \
--env="MYSQL_ROOT_PASSWORD=password123" \
--publish 4306:3306 \
example/mysql:1.00
```

If you have a mysql client on your host machine, attempt to connect and verify that the mysql server is up and running:

- `mysql -uadmin -padmin -h127.0.0.1 -P4306`
