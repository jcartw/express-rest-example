# express-rest-example

Express REST Server Example

# Build docker image and run container

- build image: `docker build --tag example/node:1.00 --file ./docker/DockerfileNode .`

- run container interactively:

```
 docker run -it \
 --mount type=bind,source="$(pwd)",target=/root \
 example/node:1.00
```

# To install dependencies, start server, and run test inside of the container

- install dependencies: `yarn install`
- start server: `yarn start`
- run tests: `yarn run test`
