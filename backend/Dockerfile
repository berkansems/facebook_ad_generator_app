FROM python:3.8.10

COPY requirements.txt /

RUN pip install -r requirements.txt

RUN mkdir facebookapp

COPY . ./facebookapp

WORKDIR /facebookapp

EXPOSE 8000/tcp

CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000" ]