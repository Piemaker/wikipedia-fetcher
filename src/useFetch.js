import  {useState, useEffect} from "react";

export default  function useFetch(url,init) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const getData = async (url,init) => {
  try {
    const response = await fetch(url,init);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    throw new Error(error.message);
  }


}
  
  useEffect(() => {
    getData(url,init);
  }, [url]);
return {isLoading, isError, data};

}
