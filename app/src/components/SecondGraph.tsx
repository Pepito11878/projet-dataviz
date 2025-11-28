interface Result{
  type_tournage: string
}

interface apiResponce{
  results: Result[]
}

async function fetchApi(){
  try {
    const api = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100")
    return api.json()
  } catch (error) {
    console.error(error)
  }
}

export function SecondGraph(){
  return(
    <div>
      <p></p>
    </div>
  )
}