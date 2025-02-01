FROM python:3.8-slim AS backend
WORKDIR /api
COPY api/requirements.txt ./
RUN pip install -r requirements.txt
COPY api/ ./
CMD ["gunicorn", "app.py"]