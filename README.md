# express-rest-example

Express REST Server Example

# MySQL Container

- build mysql image: `docker build --tag example/mysql:1.00 --file ./docker/mysql/Dockerfile ./docker/mysql`
- run container in detached mode:

```
docker run \
--detach \
--name=mysql_cont \
--env="MYSQL_ROOT_PASSWORD=password123" \
--publish 4306:3306 \
example/mysql:1.00
```

If you have a mysql client on your host machine, attempt to connect and verify that the mysql server is up and running with the `admin` credentials created via the `script.sql` file.

- `mysql -uadmin -padmin -h127.0.0.1 -P4306`

# Dev (Node.js) Container

- build dev image: `docker build --tag example/dev:1.00 --file ./docker/dev/Dockerfile ./docker/dev`
- run container interactively:

```
docker run -it \
--mount type=bind,source="$(pwd)",target=/root \
example/dev:1.00
```
