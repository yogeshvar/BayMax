FROM python:3.8.16


WORKDIR /api

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 9000

CMD ["python", "main.py"]