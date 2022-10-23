import { useEffect,useState } from "react";
import Card from '../../components/Card';
//import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import ProductTypes from "../../models/Productmodels";

const  Home:React.FC =() => {
      /*const product = useAppSelector<any>((state) => state.products.persons);
      const status = useAppSelector((state) => state.products.status);
      const hasNextPage = useAppSelector<any>((state) => state.products.hasNextPage);*/
      const nextPage = useAppSelector((state) => state.page);
      const { product, status,hasNextPage } = useAppSelector((state) => state);
      const [loading, setLoading] = useState<boolean>(true)
      const dispatch = useAppDispatch();

      useEffect(() => {
            if(status === "idle"){
              dispatch(fetchProducts(nextPage));
              setLoading(false);
            }
        } , [dispatch]);


      const   handleScroll = () => {
        // console.log("Height:", document.documentElement.scrollHeight);
        // console.log("Top:", document.documentElement.scrollTop);
        // console.log("Window:", window.innerHeight);
        // sayfanın en  üstü + ekran yüksekliği eşitse kaydırılan yüksekliğe
        // çalışsın

        if(
          window.innerHeight + document.documentElement.scrollTop +1 >=
          document.documentElement.scrollHeight 
        ){
          if(hasNextPage && !loading ){
            console.log(hasNextPage,nextPage)
            dispatch(fetchProducts(nextPage))
            setLoading(true);
          }
          
          
        }
      }

      

    //  console.log(product);

       useEffect(() => {
             window.addEventListener("scroll",handleScroll);
             return () => window.removeEventListener("scroll",handleScroll);
       },[hasNextPage,nextPage])  
          
  return (
    <>
     {product && product.map((productSingle:ProductTypes)=>(
       <Card cardData={productSingle} key={productSingle.id} />
     ))
     }
     {hasNextPage && status !== "loading"  && <button onClick={() => dispatch(fetchProducts(nextPage))}>Load more ({nextPage})</button>}
        { !hasNextPage && <div>There nothing to be shown</div>}   
    </>

  );
}

export default Home