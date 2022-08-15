from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:nsstars@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

#Definisanje polja tabele
class Articles(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text)
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    
    def __init__(self, title, body):
        self.title = title
        self.body = body

#Serijalizacija, konvertuje kompleksne tipove podataka(json) u i iz pajtonovih objekata
#load - deserijalizacije, dump - serijalizacija
class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many = True)   

###############################################
#Rute/Komande za bazu

@app.route('/get', methods = ['GET'])
def get_articles():
   all_articles = Articles.query.all()
   results = articles_schema.dump(all_articles) #serijalizacija
   return jsonify(results) #Konvertuje json output u objekat

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
    article = Articles.query.get(id) #Getuje artikl uz que-a artikala sa odgovarajucim id-ijem
    return article_schema.jsonify(article)  #Ispise nam rezultat operacije u postmanu

@app.route('/add', methods = ['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']

    articles = Articles(title,body) #Kreira artikl sa json title-om i body-em
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route('/update/<id>/', methods = ['PUT'])
def update_articles(id):
    article = Articles.query.get(id)

    title = request.json['title'] #Uzima title i body koji smo mu mi otkucali 
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    return article_schema.jsonify(article)

@app.route('/delete/<id>/', methods = ['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)
    db.session.delete(article)  #Brise artikl iz baze
    db.session.commit()

    return article_schema.jsonify(article)
###############################################
if __name__ == "__main__":
    app.run(host = '192.168.56.1',port = 3000, debug=True) 

# db.create_all()
# db.session.commit()
#39:00