# Specify the base image
FROM python:3.10.12

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt into the container
COPY requirements.txt /app/

# Install the dependencies from requirements.txt
RUN pip install -r requirements.txt

# Copy the entire app into the container
COPY . /app/

# Start the app with gunicorn on port 5000
CMD ["gunicorn", "api:app", "--bind", "0.0.0.0:5000"]