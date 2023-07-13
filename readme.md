### Backend microservices with fronted ui project

Do uruchomienia projektu wymagany jest manager pakietów npm oraz docker.

Przed uruchomieniem należy wypełnić pliki `.env` w folderach mikro-serwisów, które nie są wersjonowane.
Ich przykłady znajdują się w plikach `.env.template`.

Aby uruchomić projekt należy po prostu użyć komendy `docker-compose up` w folderze głównym projektu.
Wszystkie usługi powinny uruchomić się samoistnie oraz gotowe do działania.

Opis mikro-serwisów oraz ich portów znajduje się w pliku readme.md w folderze backend.

Aby uruchomić część frontendową należy użyć komend `npm i`, a potem `npm start` w folderze frontend/hades.

Baza jest domyślnie wypełniona dwoma użytkownikami:
 - user: `admin`, hasło: `admin` 
 - user: `user`, hasło: `user`

