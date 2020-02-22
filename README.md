### Проект сделал для развертывания в докере

комманда для запуска

    docker-compose up
    
Пользователи
        
        login: "writer@mail.com",
        password: '123456',
        role: "writer"
                
        login: "reader@mail.com",
        password: '123456',
        role: "reader"
         
Клиентская часть запустится на:
   - http://localhost:8080
   
Серверная 
   - http://localhost:3000
   
БД
   - http://localhost:27017

Если есть ошибки 
    
    docker stop $(docker ps -a -q) // остановить все контейнеры
    docker rm $(docker ps -a -q) // удалить все контейнеры
    
Так же сервер и клиент можно запустить отделно
    
    npm start --prefix server/    //сервер
    npm start --prefix client/    //клиент
    mongod --dbpath ./db          //БД 
          
Я намеррено не сделал сохранение того что пользователь вошел

так проще проверить функционал 

это можно сделать через куки или локал сторедж