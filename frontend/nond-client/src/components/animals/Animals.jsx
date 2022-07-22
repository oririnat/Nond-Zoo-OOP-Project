import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import MyAnimals from './animalPresentation/MyAnimals'
import AnimalsControls from './AnimalsControls'
import { handleAnimalDeletion } from '../Shared/ApiCalls'
import { errorWithMessage } from '../Shared/swalAlerts'

const Animals = () => {

    const [myAnimals, setMyAnimals] = useState([])

    function getAnimals() {
      console.log('getting animals')
      axios
        .get('http://localhost:8080/animals')
        .then((res) => {
          console.log(res)
          setMyAnimals(res.data)
        })
        .catch((err) => {
          console.log('got error while retirieving animals', err)
          errorWithMessage('got error while retirieving animals')
        })
    }
  
    useEffect(() => {
      getAnimals()
    }, [])
    return (<>
        <AnimalsControls
        setMyAnimals={setMyAnimals}
        getAnimals={getAnimals}
      />
      <MyAnimals
        myAnimals={myAnimals}
        handleAnimalDeletion={handleAnimalDeletion}
        triggerAnimalsRetrieval={getAnimals}
      />
        </>)
}

export default Animals;