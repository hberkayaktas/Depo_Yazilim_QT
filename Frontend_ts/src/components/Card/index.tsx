import React, { FunctionComponent } from 'react'
import { Link } from "react-router-dom";
import ProductTypes from '../../models/Productmodels';


interface ICardProps {
  cardData: ProductTypes
}

const Card: FunctionComponent<ICardProps> = (props) => {
  return (
    <div className="card m-1 p-0" style={{ width: '15rem' }} key={props.cardData.id}>
      <img src={`./img/${props.cardData.imageUrl}`} className="card-img-top w-100" height={250} alt={props.cardData.name} />
      <div className="card-body">
        <Link to={`/product/${props.cardData.id}`}>
          <h5 className="card-title text-dark text-decoration-underline">{props.cardData.name}</h5>
        </Link>
        <div className='d-flex space-between'>
          <p className="card-text flex-grow-1">{props.cardData.price} ₺</p>
          <Link to={`/product/${props.cardData.id}`} className="btn btn-success float-end">
            Satın al
          </Link>
        </div>

      </div>
    </div>

  )
}

export default Card