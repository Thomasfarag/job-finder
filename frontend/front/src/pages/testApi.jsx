import React, { useEffect } from 'react'
import  axios  from 'axios';

function testApi() {
    const [data, setData] = useState(second)
    useEffect(() => {
      
        async function getData() {
    const {data}=axios.get("http://localhost:8800/api-v1/companies/");
    setData(data)
    console.log(data)

    }    getData() 

      return () => {
        
      }
    }, [])
    


  return (
    <div>{data}</div>
  )
}

export default testApi