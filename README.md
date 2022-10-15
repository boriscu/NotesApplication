# PRVI ZADATAK
- Pogledati na Trelo-u zadatak, odraditi ga, i oznaciti da je zavrsen

# Ideje
- Gym themed aplikacija
- Moje krpice fazon aplikacija
- Kupovina odece aplikacija - renderovanje 
...

## Resursi(Redom)
1. https://www.youtube.com/watch?v=mEUSNId1Hfc&ab_channel=ParwizForogh
2. https://www.youtube.com/watch?v=LlvBzyy-558&ab_channel=PedroTech
3. https://www.youtube.com/watch?v=8-W2O_R95Pk&ab_channel=4Geeks

## Trelo
- Ovde cemo otvarati kartice ko sta radi i voditi evidenciju
- link : https://trello.com/invite/b/RyeYFE1e/e0518e087224f8c5c7c90b3e90c8f4a1/group-project-aplikacija

## Uputstvo
- Pre svega potrebno vam je da imate [node.js](https://nodejs.org/en/download/) i [python](https://www.python.org/downloads/) (pazi da dodas i [pathove](https://www.configserverfirewall.com/windows-10/add-python-to-path-windows-10/))
- Za editor koristi vs code i skini ekstenziju za python, otvaras powershell sa ctrl+~ i tu onda sve kucas normalno, s desne strane imas plusic da otvoris jos koji
- Pullovati ovaj ceo repozitorijum git init -> git remote add origin https://github.com/boriscu/groupProject.git -> git pull origin master
- Pozicionirati se sa cd u .\backend\ i izvrsiti sledece komande pip install Flask, pip install Flask-SQLAlchemy, pip install mysqlclient, pip install flask-marshmallow, pip install marshmallow-sqlalchemy
- Pokretanje servera sa cd .\backend\ -> python app.py
- Zatim je potrebno instalirati [postgresSQL](https://www.postgresql.org/download/) i poterati pgadmin (napomena izbacice vam stack builder instalaciju samo idite x ne treba vam to)
- U pgadminu, uci u grupu i odraditi desni klik -> create new database -> nazvati je flask
- Pozicionirati se opet u .\backend\ i otkucati sledece python -> from app import db -> db.create_all()
- U novom shellu kucaj npm install da bi dobio sve node module
- Da bi instalirali react native i expo client otkucati npm install -g expo-cli
- Nakon toga u tom istom shellu kucaj npm start (Da bi aplikacija u potpunosti radila mora u isto vreme trcati i app.py u drugom prozoru
- Mozes povezati android uredjaj usbom za komp ili skinuti neki emulator odnosno [Android Studio](https://www.google.com/search?q=android+studio&oq=android+studi&aqs=chrome.0.35i39j69i57j0i512l3j69i60j69i61l2.1606j0j7&sourceid=chrome&ie=UTF-8) a za namestanje emmulatora klikni [ovde](https://www.youtube.com/watch?v=x_lvdLil0Fk&ab_channel=Sarthak%27sTricks) i u konzoli ce biti napisano Press a to open Android
- NAPOMENA: Za sad nemamo oficijalnu bazu tako da ce svako morati da ima lokalnu, u file-u app.py cete videti u 8 liniji app.config[SQLALCHEMY...] tu je potrebno napisati umesto nsstars vasu lozinku odnosno '' ukoliko je nemate i nakon toga umesto ip-a u app.py uneti vas ipv4 (da bi video ovo otvoris cmd i kucas ipconfig)
- OPCIONO: Postman client je odlican za debagovanje http rikvestova i rad sa bazom
- GRESKE: Gresaka nema u aplikaciji tako da ako nesto ne radi do tvog setapa je, pisi u grupu nas troje je uspelo sve da namesti neko je verovatno imao problem kao i ti. Sem toga za sve ovo postoji google samo kopiraj gresku 99% je da ce ti izbaciti resenje

## Dalja logistika
- Sve sto radite, radite u svom branchu. Kucate git branch vaseimeBranch -> git checkout vaseimeBranch -> git add, git commit -> git push origin vaseimeBranch i kad zavrsite sta imate: Na githabu idete na create pull request u prvi box stavite master a u drugi ime vase grane i kliknete na zeleno dugme create pull request

## Kontakt
- Posaljite mi git username da mogu da vas dodam kao kolaboratore na repozitorijum
- Za svu komunikaciju predlazem da napravimo whatsapp grupu

## Zasto bas react i flask
- Na faksu cemo manje vise svi raditi python i javascript pa nam je ovo i najkorisnije. Takodje flutter je ok opcija ali ne pruza nista to react vec nema, a da ucimo dart samo zbog toga je cimanje + u srbiji je react mnogo trazeniji za sad.
- Ako ste bas za flutter mozemo krenuti ispocetka sve u njemu

boris
anja<3
Nile