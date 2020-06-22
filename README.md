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
--link mysql_cont \
example/dev:1.00
```

You can verify the mysql container link from within the dev container:

- `mysql -uadmin -padmin -hmysql_cont -P3306`

Load up the system data model:

- `mysql -uadmin -padmin -hmysql_cont -P3306 < src/data-model.sql`

# Install dependencies, start server, and run test inside of the container

- install dependencies: `yarn install`
- start server: `yarn start`
- run tests: `yarn run test`
