sudo docker build -t facebook_ui .
sudo docker run --rm --net facebook -p 4200:4200 facebook_ui
docker network create facebook
