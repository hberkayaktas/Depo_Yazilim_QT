import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function DetailCard() {
  const { id } = useParams();
  console.log(id);
  const [product,SetProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios(`http://localhost:5000/product/${id}`)
      .then((res) => res.data)
      .then((data) => SetProduct(data.product))
      .finally(() => setLoading(false));
  }, [id]);
  console.log(product)
  return (
    <>
    {loading && <>Loading</>}
    {!loading && (
 <div className="card">
 <div className="row p-3">
   <div className="col-md-4">
     <img src={`/img/${product.imageUrl}`} className="card-img" height={305} alt="..." />
   </div>
   <div className="col"> 
     <h5 className="card-title">{product.name}</h5>
     <p className="card-text">{product.description}</p>
     <p className="card-text">{product.price}</p>
     <a href="#!" className="btn btn-success float-start">Satın Al</a>
   </div>
 </div>
</div>
    )}
    </>
     
    
  )
}

export default DetailCard