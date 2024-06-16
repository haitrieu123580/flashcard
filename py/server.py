import uuid
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
load_dotenv()
app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=[os.getenv('CLIENT_URL')],  
  allow_credentials=True,
  allow_methods=["GET"],
  allow_headers=["*"],
)
# Kết nối và truy vấn từ cơ sở dữ liệu (ví dụ dùng pandas và SQLAlchemy)
from sqlalchemy import create_engine

db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('DB_DATABASE')
DATABASE_URI = f'postgresql://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(DATABASE_URI)

# Hàm chuẩn hóa chuỗi
def normalize_text(text):
    text = text.lower()
    text = ''.join([c for c in text if c.isalnum() or c.isspace()])
    return text

def get_recommendations(set_id):
    # Truy vấn dữ liệu từ các bảng
    df_sets = pd.read_sql('SELECT * FROM "sets"', engine)
    df_cards = pd.read_sql('SELECT * FROM "cards"', engine)
    df_user_progress = pd.read_sql('SELECT * FROM "user_progress"', engine)
    df_sets.fillna({'score': 0, 'level': 0}, inplace=True)
    df_sets['combined_features'] = df_sets.apply(lambda x: f"{x['name']} {x['level']*1.2} {str(x['created_by'])} {x['description']}", axis=1)
    df_sets['combined_features'] = df_sets['combined_features'].apply(normalize_text)
    # Nếu có các trọng số khác nhau cho các đặc trưng

    # Tính TF-IDF matrix
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df_sets['combined_features'])

    # Tính điểm tương đồng cosine
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    try:
        set_uuid = uuid.UUID(set_id)
    except ValueError:
        raise ValueError("Set ID không hợp lệ")

    if set_uuid not in df_sets['id'].values:
        raise ValueError("Set ID không tồn tại trong dữ liệu")

    # Lấy chỉ số của bộ từ vựng
    idx = df_sets.index[df_sets['id'] == set_uuid].tolist()[0]

    # Lấy điểm tương đồng của tất cả các bộ từ vựng với bộ từ vựng được chọn
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sắp xếp các bộ từ vựng dựa trên điểm tương đồng
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Lấy các chỉ số của các bộ từ vựng tương đồng nhất
    set_indices = [i[0] for i in sim_scores]

    # Trả về các bộ từ vựng công khai, chuyển đổi UUID thành chuỗi
    public_set_indices = [i for i in set_indices if df_sets.iloc[i]['is_public']]
    recommendations = df_sets.iloc[public_set_indices].copy()
    recommendations['id'] = recommendations['id'].apply(lambda x: str(x))  # Chuyển đổi UUID thành chuỗi
    recommendations['userId'] = recommendations['userId'].apply(lambda x: str(x))  # Chuyển đổi UUID thành chuỗi

    recommendations['created_at'] = recommendations['created_at'].astype(str)  # Chuyển đổi Timestamp thành chuỗi
    recommendations['updated_at'] = recommendations['updated_at'].astype(str)  # Chuyển đổi Timestamp thành chuỗi
    recommendations['deleted_at'] = recommendations['deleted_at'].astype(str)  # Chuyển đổi Timestamp thành chuỗi
    recommendations.fillna(value='', inplace=True)


    return recommendations


# Hàm để tính tổng số card thuộc về setId
def count_cards(set_id):
    # Chuyển đổi set_id thành UUID
    set_uuid = uuid.UUID(set_id)
    # Thực hiện truy vấn để lấy tổng số card thuộc về setId từ bảng Cards
    df_cards = pd.read_sql('SELECT * FROM "cards"', engine)

    total_cards = len(df_cards[df_cards['setId'] == set_uuid])
    return total_cards

# Route để recommend và lấy thông tin tổng số card
@app.get('/recommend')
async def recommend(request: Request):
    set_id = request.query_params.get('set_id')
    try:
        # Lấy danh sách các recommendations
        recommendations = get_recommendations(set_id)
        
        # Tính tổng số card cho mỗi recommendation và thêm vào dataframe
        for idx, row in recommendations.iterrows():
            total_cards = count_cards(row['id'])
            recommendations.at[idx, 'totalCards'] = total_cards
        
        # Chuyển đổi dataframe thành dictionary và trả về JSONResponse
        return JSONResponse(content=recommendations.to_dict(orient='records'))
    except ValueError as e:
        return JSONResponse(content={'error': str(e)}, status_code=400)