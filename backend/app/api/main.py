from fastapi import FastAPI, Depends, HTTPException
# Esperado: algo como "LocalSession" para gerar minha sessão, 
# tabelas "Noticia", "Categoria", "Fonte"
from model import engine, LocalSession, Noticia, Categoria, Fonte
from datetime import datetime, timedelta, timezone
from sqlalchemy import select, func

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
                     src: str = None, 
                     db = Depends(get_db)):
    
    stmt = select(Noticia)

    # join ou relationship?
    if categoria:
        stmt = stmt.join(Categoria, Noticia.categoria == Categoria.id)
        stmt = stmt.where(Categoria.nome == categoria)

    if src:
        stmt = stmt.join(Fonte, Noticia.fonte == Fonte.id)
        stmt = stmt.where(Fonte.nome == src)
    
    if q:
        stmt = stmt.where(Noticia.titulo.contains(q))
    
    offset = p * limit
    stmt = stmt.offset(offset).limit(limit)
    

    noticias = db.execute(stmt.order_by(Noticia.data.desc())).scalars().all()
    return noticias

@app.get("/noticias/{id}")
async def read_item(id: int, db = Depends(get_db)):
    stmt = select(Noticia).where(Noticia.id == id)
    noticia = db.execute(stmt).scalars().first()
    if noticia is None:
        raise HTTPException(status_code=404, detail="Noticia nao encontrada.")
    return noticia

@app.get("/categorias")
async def list_cat(db = Depends(get_db)):
    stmt = select(Categoria)
    categorias = db.execute(stmt).scalars().all()
    return categorias

@app.get("/fontes")
async def list_source(db = Depends(get_db)):
    stmt = select(Fonte)
    fontes = db.execite(stmt).scalars.all()
    return fontes

@app.get("/estatisticas")
async def list_estatisticas(db = Depends(get_db)):
    stmt_cat = (
        select(Categoria.nome, func.count(Noticia.id).label("total"))
        .outerjoin(Noticia, Noticia.categoria_id == Categoria.id)
        .group_by(Categoria.id)
    )
    resultados_cat = db.execute(stmt_cat).all()
    dict_categoria = {nome: total for nome, total in resultados_cat}
    stmt_fonte = (
        select(Fonte.nome, func.count(Noticia.id).label("total"))
        .outerjoin(Noticia, Noticia.fonte_id == Fonte.id)
        .group_by(Fonte.id)
    )
    resultados_fonte = db.execute(stmt_fonte).all()
    dict_fonte = {nome: total for nome, total in resultados_fonte}
    return {
        "categoria": dict_categoria,
        "fonte": dict_fonte
    }

@app.get("/estatisticas/tendencias")
async def make_tendencies(db = Depends(get_db)):
    # Funciona?
    stmt = (
    select(Categoria.nome, func.count(Noticia.id).label("total"))
    .join(Noticia, Noticia.categoria_id == Categoria.id)
    )

    data_limite = datetime.now() - timedelta(days=28)
    stmt = select(Noticia)
    stmt = stmt.where(Noticia.data >= data_limite)
    stmt = stmt.group_by(Categoria.id)
    stmt = stmt.order_by(func.count(Noticia.id).desc())
    resultados = db.execute(stmt).all().limit(5)
    return [{"categoria": nome, "total": total} for nome, total in resultados]
