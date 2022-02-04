sudo docker build -t facebookapp .
sudo docker run --rm --net facebook -p 8000:8000 facebookapp