import React, { useState,useEffect } from 'react'
import {Marker,GoogleMap, LoadScript,DistanceMatrixService } from '@react-google-maps/api';
import israeliSettelments from "../cities.json"
import StartMenu from './StartMenu';


const defaultCenter = {lat: 31.4,  lng: 34.7,}

const mapStyle = {
    height:'100vh',
    width:'100%'
}

const MapTypeStyle = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
];
const editedCities = israeliSettelments.map((settlement) => {
    return {
        name: settlement.MGLSDE_L_4,
        population: settlement.MGLSDE_L_1,
        lat: settlement.Y,
        lng: settlement.X,
        };
});

function Map() {

    const [markerPosition,setMarkerPosition] = useState();
    const [currentCity, setCurrentCity] = useState(null);
    const [count, setCount] = useState(1)
    const [score,setScore] = useState(0)
    const [level,setLevel] = useState(1)
    const [userName,setUserName] = useState("")
    const [showModal,setShowModal] = useState(true)
    const [oneScore,setOneScore] = useState(0)
    
    
    const randomCurrentCity = () => {
        const index = Math.floor(Math.random() * editedCities.length);
        if(editedCities[index].name){
            setCurrentCity(editedCities[index])
        }
        else{
            randomCurrentCity()
        }
        console.log(index,'this is the random number' + " the city is " + editedCities[index].name)
    }

    const handleStart = (name,selectLevel) =>{
        if(name)
        {
            setShowModal(false)
            setUserName(name)
            setLevel(selectLevel)
        }
    }

    useEffect( () => {
        randomCurrentCity();
    },[])

    const distance = (lat1,lon1,lat2,lon2) =>{
            //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
    

    const positionSelector = (e) =>{
        let positionClick = {
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
        }
        setMarkerPosition(positionClick)
        let distanceInKm = Math.floor(distance(currentCity.lat,currentCity.lng,e.latLng.lat(),e.latLng.lng()))
        if(distanceInKm > 100){
            setOneScore(-(distanceInKm-100))
            setScore(score - (distanceInKm-100))
            
            if(count<10)
            {
                setCount(count+1);
                randomCurrentCity()
            }
        }
        else{
            setOneScore(100-distanceInKm)
            setScore(score + (100-distanceInKm))
            
            if(count<10)
            {
                setCount(count+1);
                randomCurrentCity()
            }
        }
        
    }

    return (
    currentCity && (
        <LoadScript googleMapsApiKey='AIzaSyBh4Sev4yYARt9XdMOaeAUPKPZQZ6iaWcs'
        >
            <StartMenu showModal={showModal} setShowModal={setShowModal} handleStart={handleStart} userName={userName} level={level} setUserName={setUserName} setLevel={setLevel}/>
            <GoogleMap
                mapContainerStyle={mapStyle}
                zoom={7.2}
                center={defaultCenter}
                options={{
                    scrollwheel: true,
                    zoomControl: false,
                    draggable: false,
                    mapTypeId: "satellite",
                    styles: MapTypeStyle,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    draggableCursor: 'default'
                }}
                onClick={positionSelector}
                >
                <Marker
                key={"currentCity"}
                position={markerPosition}
                />
                {
                    showModal ? 
                    <div></div>
                    :
                    <div className="scoring">
                    {
                        (showModal===false) && (
                            <div>
                                <p>Hi {userName} :)<br/></p>
                                <p>Your Level is {level} </p>
                                {count < 10 ?
                                (
                                     <p>
                                        Find <span style={{backgroundColor:"greenYellow",color:"black"}}>{currentCity.name}</span> on the map<br/>
                                        score : {score} <br/>
                                            {
                                                oneScore === 0 ?
                                                ""
                                                :
                                                <span>
                                                    {oneScore > 0 ? 
                                                        <span style={{color:"green"}}>
                                                            + {oneScore}
                                                        </span>    
                                                    : 
                                                    <span style={{color:"red"}}>
                                                        {oneScore}
                                                    </span>                                                
                                                }

                                                </span>
                                            }
                                    </p>
                                )
                                :
                                    `You got ${score} points`
                                }
                            </div>
                        )
                    }
                    </div>

                }
                
            </GoogleMap>
        </LoadScript>
    )

    )
}

export default Map
