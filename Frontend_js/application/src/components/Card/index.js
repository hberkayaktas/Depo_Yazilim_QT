import React from 'react'
import { Link } from "react-router-dom";

function Card({cardData}) {
  return (
      <div className="card m-1 p-0" style={{width: '15rem'}}   key={cardData.id}>
      <img src={`./img/${cardData.imageUrl}`} className="card-img-top w-100" height={250} alt="..." />
      <div className="card-body">
        <Link to={`/product/${cardData.id}`}>
        <h5 className="card-title text-dark text-decoration-underline">{cardData.name}</h5>
        </Link>
        <div className='d-flex space-between'>
        <p className="card-text flex-grow-1">{cardData.price} ₺</p>
        <Link to={`/product/${cardData.id}`} className="btn btn-success float-end">
          Satın al
          </Link>
        </div>
        
      </div>
    </div>
    
  )
}

export default Card