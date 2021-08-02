# take down previous images/networks running
docker compose down # takes down docker-compose.yaml network if running
# docker rm js 

# recreate js-backend app image
echo Creating JS backend...
cd js-server
rm -r app # removes app dir
mkdir app # creates app dir
cp package.json ./app/ # copies package.json
cp tsconfig.json ./app/ # copies tsconfig.json
cp -r src ./app/ # copies src/
cp -r dist ./app/ # copies /dist
cd ../

docker image rmi mycollage-js-backend:1.0 # removed mycollage-js-backend image
docker build -t mycollage-js-backend:1.0 ./js-server  # rebuilds mycollage-js-backend image
echo JS backend created...

# recreate java-backend app image
echo Creating Java backend...
cd projects # to read the java Dockerfile
# ./mvnw clean compile assembly:single # create jar file
docker image rmi mycollage-java-backend:1.0 # removed mycollage-js-backend image
docker build -t mycollage-java-backend:1.0 .  # build mycollage-js-backend image
echo Java backend created...

# run images/networks
# docker run -p 5000:5000 --name=js mycollage-js-backend:1.0
docker compose up # runs docker-compose.yaml file
