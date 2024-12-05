prieš paleidžiant backend:
docker run --name mongodb -p 27017:27017 -v /some/local/folder:/data/db -d mongo
# arba bet kaip kitaip startuot mongodb


backend:
# pradedant nuo projekto root :
cd backend // go to folder "backend"
npm ci
npm start

frontend:
# pradedant nuo projekto root :
cd frontend
npm ci
npm run dev
