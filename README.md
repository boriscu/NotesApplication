# PRVI ZADATAK
- Koriscenje Trel-a i Git-a : Pogledati na Trelo-u zadatak, odraditi ga, i oznaciti da je zavrsen

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

## Environment set-up
- Pre svega potrebno vam je da imate [node.js](https://nodejs.org/en/download/) i [python](https://www.python.org/downloads/) (pazi da dodas i [pathove](https://www.configserverfirewall.com/windows-10/add-python-to-path-windows-10/))
- Za editor koristi vs code i skini ekstenziju za python, otvaras powershell sa ctrl+~ i tu kucas sve komande, s desne strane imas plusic da dodas novi powershell
- Pullovati ovaj ceo repozitorijum git init -> git remote add origin git_http(na glavnoj stranici repozitorijuma klikni zeleno dugme code i kopiraj taj https) -> git pull origin master
- Pozicionirati se sa cd u .\backend\ i izvrsiti sledece komande pip install Flask, pip install Flask-SQLAlchemy, pip install mysqlclient, pip install flask-marshmallow, pip install marshmallow-sqlalchemy
- Pokretanje servera sa cd .\backend\ -> python app.py
- Zatim je potrebno instalirati [postgresSQL](https://www.postgresql.org/download/) i poterati pgadmin (napomena izbacice vam stack builder instalaciju samo idite x ne treba vam to)
- U pgadminu, uci u grupu i odraditi desni klik -> create new database -> nazvati je flask(malim slovima sve obavezno)
- Pre sledeceg koraka pogledaj napomenu na kraju uputstva
- Pozicionirati se opet u .\backend\ i otkucati sledece python -> from app import db -> db.create_all(), ako ti ovde izbaci gresku to je jer nemas set-upovan virtual environment, da to ne bi sad morao da radis, na kraju koda u app.py otkucaj sledece: 
with app.app_context():
    db.create_all()
i normalno pokreni program sa python app.py(pozicioniran si u ./backend), kad se tako program izvrsi tabela ce biti kreirana te zakomentarisi te 2 linije da se ne bi kreirala opet svaki put kad pokrenes program
- U novom shellu kucaj cd ./backend/AppPorject -> npm install da bi dobio sve node module
- Da bi instalirali react native i expo client, otkucati npm install -g expo-cli
- Nakon toga u tom istom shellu kucaj npm start (Da bi aplikacija u potpunosti radila mora u isto vreme trcati i app.py u drugom prozoru
- Mozes povezati android uredjaj(skini aplikaciju expo go sa google play storea) usbom(videces opciju i da skeniras qr kod al nemoj to presporo je i stalno ispadaju network greske) ili skinuti neki emulator odnosno [Android Studio](https://www.google.com/search?q=android+studio&oq=android+studi&aqs=chrome.0.35i39j69i57j0i512l3j69i60j69i61l2.1606j0j7&sourceid=chrome&ie=UTF-8) a za namestanje emmulatora klikni [ovde](https://www.youtube.com/watch?v=x_lvdLil0Fk&ab_channel=Sarthak%27sTricks) i u konzoli ce biti napisano Press a to open Android, to kad pritisnes aplikacija ce se sama pokrenuti
- Ako ti se ne otvori na mobilnom, moras namestiti na uredjaju developer options, klikni [ovde](https://developer.android.com/studio/debug/dev-options) i onda otkaciti usb debuging
### NAPOMENA: Za sad nemamo oficijalnu bazu tako da ce svako morati da ima lokalnu, u file-u app.py cete videti u 8 liniji app.config[SQLALCHEMY...] tu je potrebno napisati umesto nsstars vasu lozinku odnosno '' ukoliko je nemate i nakon toga umesto ip-a u app.py uneti vas ipv4 (da bi video ovo otvoris cmd i kucas ipconfig). Jako vazno da bi radila komunikacija s bazom, gde god naidjete na moj ip u formama(create, edit, home...) upisite svoj ipv4
#### OPCIONO: Postman client je odlican za debagovanje http rikvestova i rad sa bazom
#### GRESKE: Gresaka nema u aplikaciji tako da ako nesto ne radi do tvog setapa je, pisi u grupu(Niletu) svi do sad smo namestili, neko je verovatno imao problem kao i ti. Sem toga za sve ovo postoji google samo kopiraj gresku 99% je da ce ti izbaciti resenje. Za greske gde nemas autoritet da pokrenes neku komandu, otvori cmd kao admin i onda probaj(u win search kucas cmd desni klik run as administrator)

## Dalja logistika
- Sve sto radite, radite u svom branchu. Da bi kreirali granu kucate git branch vaseimeBranch -> da bi se premestili u neku granu kucate git checkout vaseimeBranch -> git add . -> git commit -m "Opis -> git push origin vaseimeBranch i kad zavrsite sta imate: Na githabu idete na create pull request u prvi box stavite master a u drugi ime vase grane i kliknete na zeleno dugme create pull request
- Ako niste nikakav novi fajl kreirali umesto git add . -> git commit -m mozete kucati git commit -am 
## Kontakt
- Posaljite mi git username da mogu da vas dodam kao kolaboratore na repozitorijum
- Za svu komunikaciju predlazem da napravimo whatsapp grupu i koristicemo zmajevi discord

## Zasto bas react i flask
- Na faksu cemo manje vise svi raditi python i javascript pa nam je ovo i najkorisnije. Takodje flutter je ok opcija ali ne pruza nista to react vec nema, a da ucimo dart samo zbog toga je cimanje + u srbiji je react mnogo trazeniji za sad.
- Ako ste bas za flutter mozemo krenuti ispocetka sve u njemu(nemoj pls)

boris
anja<3
Nile
