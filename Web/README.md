# BayMax - API

## Getting Started

### Prerequisites

For this, you need to work on BayMax Model first. Obtain the model after training and place it in the root of the project.

### Install

```
$ python -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

### Start & watch

```
$ python main.py
```

### Testing

You can test the API with the help of [rest.http](./rest.http)

### Docker Image

Dockerfile is provided for building the image. You can build the image with the following command:

```
$ docker build -t baymax-api .
```

You can run the image with the following command:

```
$ docker run -p 9000:9000 baymax-api
```

### Docker Compose

Docker Compose file is provided for running the API with the help of docker-compose. You can run the API with the following command:

```
$ docker-compose up
```

Note: Make sure to place the model in the root of the project before running the docker-compose command. And update the image name in the docker-compose file if you have built the image with a different name.
