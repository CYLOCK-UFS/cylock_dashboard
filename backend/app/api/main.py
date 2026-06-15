from fastapi import FastAPI, Depends
#Esperado: algo como "LocalSession" para gerar minha sessão
from model import engine, LocalSession, Noticia
from sqlalchemy import select

app = FastAPI()
itemsperpage = 20

def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()


@app.get("/noticias")
async def list_items(limit: int = 20, 
                     p: int = 0, 
                     q: str = None, 
                     categoria: str = None, 
                     fonte: str = None, 
                     db = Depends(get_db)):
    
    stmt = select(Noticia)
    filters = {
        "categoria": Noticia.categoria,
        "fonte": Noticia.fonte,
    }

    for param, coluna in filters.items():
        value = locals().get(param)
        if value is not None:
            stmt = stmt.where(coluna == value)
    
    if q:
        stmt = stmt.where(Noticia.titulo.contains(q))
    
    offset = p * limit
    stmt = stmt.offset(offset).limit(limit)

    noticias = db.execute(stmt).scalars().all()
    return noticias



@app.get("/noticias/{id}/")
async def read_item(id: int, db = Depends(get_db)):
    stmt = select(Noticia).where(Noticia.id == id)
    noticia = db.execute(stmt).scalars().first()
    if noticia is None:
        # Opcional: levantar HTTPException
        return {"erro": "Notícia não encontrada"}
    return {
        "id": noticia.id,
        "titulo": noticia.titulo,
        "conteudo": noticia.conteudo,
        "autor": noticia.autor
    }