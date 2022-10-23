import { useEffect,useState } from "react";
import Card from '../../components/Card';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";

function Home() {
      const characters = useSelector((state) => state.products.persons);
      const status = useSelector((state) => state.products.status);
      const hasNextPage = useSelector((state) => state.products.hasNextPage);
      const nextPage = useSelector((state) => state.products.page);
      const [loading, setLoading] = useState(true)
      const dispatch = useDispatch();

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
          if(hasNextPage ){
            console.log(hasNextPage,nextPage)
            dispatch(fetchProducts(nextPage))
            setLoading(true);
          }
          
          
        }
      }

      

    //  console.log(characters);

       useEffect(() => {
             window.addEventListener("scroll",handleScroll);
             return () => window.removeEventListener("scroll",handleScroll);
       },[hasNextPage,nextPage])  
          
  return (
    <>
     {characters.map((character)=>(
       <Card cardData={character} key={character.id} />
     ))
     }
     {hasNextPage && status !== "loading"  && <button onClick={() => dispatch(fetchProducts(nextPage))}>Load more ({nextPage})</button>}
        { !hasNextPage && <div>There nothing to be shown</div>}   
    </>

  );
}

export default Home