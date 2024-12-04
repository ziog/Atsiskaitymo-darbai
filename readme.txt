before running backend:
docker run --name mongodb -p 27017:27017 -v /some/local/folder:/data/db -d mongo
# or any other way to run mongodb, connection string is set in environment variable

backend:
# starting from project's root folder:
cd backend // go to folder "backend"
npm ci
npm start

frontend:
# starting from project's root folder:
cd frontend
npm ci
npm run dev