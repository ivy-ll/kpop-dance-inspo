# Frontend
FROM node:14 AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend
FROM python:3.8-slim AS backend
WORKDIR /api
COPY api/requirements.txt ./
RUN pip install -r requirements.txt
COPY api/ ./
CMD ["gunicorn", "app.py"]