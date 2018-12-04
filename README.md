#Project setup by annant gupta
#Server side developed by adwait mathkari
#Client side developed by jagjit shinde


# mea2n-typescript
Mongo Express Angular2 Node (typescipt & client side lazy load support)



Steps to start application
1. open terminal
2. docker start mongodb
3. docker start redis
4. docker start codezinger
5. docker exec -it codezinger bash
6. cd project/your_project_folder
7. for first time do npm install. other wise move to step 8.
8. npm start //to build client project
9. open a new tab in terminal
10. docker exec -it codezinger bash
11. cd project/your_project_folder
12. gulp serve //to build and start server project





///enter into any docker container

docker exec -it container_name bash


//start/stop a docker container
docker start/stop container_name
