import feedparser
from datetime import datetime
from app.models.model import LocalSession, Noticia, Categoria, Fonte, Base, engine

Base.metadata.create_all(engine)

FONTES_RSS = {
    "The Hacker News": "https://feeds.feedburner.com/TheHackersNews",
    "BleepingComputer": "https://www.bleepingcomputer.com/feed/",
}

def get_or_create_fonte(db, nome):
    fonte = db.query(Fonte).filter_by(nome=nome).first()
    if not fonte:
        fonte = Fonte(nome=nome)
        db.add(fonte)
        db.commit()
    return fonte

def get_or_create_categoria(db, nome):
    categoria = db.query(Categoria).filter_by(nome=nome).first()
    if not categoria:
        categoria = Categoria(nome=nome)
        db.add(categoria)
        db.commit()
    return categoria

def coletar():
    db = LocalSession()

    for nome_fonte, url in FONTES_RSS.items():
        fonte = get_or_create_fonte(db, nome_fonte)
        feed = feedparser.parse(url)

        for entrada in feed.entries:
            existe = db.query(Noticia).filter_by(link=entrada.link).first()
            if existe:
                continue

            categoria = get_or_create_categoria(db, "geral")

            noticia = Noticia(
                titulo=entrada.title,
                resumo=entrada.get("summary", ""),
                link=entrada.link,
                data=datetime.now(),
                fonte_id=fonte.id,
                categoria_id=categoria.id,
            )
            db.add(noticia)

    db.commit()
    db.close()
    print("Coleta finalizada.")

if __name__ == "__main__":
    coletar()