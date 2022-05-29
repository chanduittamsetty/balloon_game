import React, { useEffect, useState } from 'react'

export const BalloonGame = () => {
    //*state to store balloons shooted 
    let [shooted,setShooted]=useState([]);
    //*state to initilize and store five cicrle backgroud colors
    const [color_balloons, setColor_balloons] = useState([]);
    let arr = [];
    let i=0;
    //* generating 5 random colors
    const generateColor_balloons = () => {
      while(i<5){
          let random=Math.floor(Math.random()*16777215).toString(16);
          let flag=true;
          arr.map((el)=>{if(el.color==random){flag=false}});
          if(flag){
            arr.push({color:random , id: ++i})
          }
      }
      setColor_balloons(arr);
    }    
    // using useState hook to set input value to shoot
    const [value, setValue] = useState("");

    useEffect(()=>{
        generateColor_balloons();
    }, [])

    // handling what to do when we shoot
    const handleClick = () => {
        color_balloons.map((random,ind) => {if((ind+1)===Number(value)){setShooted([...shooted,random])}});
        color_balloons.splice(Number(value-1),1);
        setValue("");
    }

    const removeballoon=(item)=>{
        setShooted(shooted.filter((el)=>{if(el.color!==item.color){return true}}));
        setColor_balloons([...color_balloons,item].sort((a,b)=>(a.id)-(b.id)));

    }
    
    return (
        <div style= {{display: "flex", justifyContent: "space-around", marginTop: "25px"}}>
            <div className="empty_div" style={{border: "1px solid red", width: "38%", height: "400px", display: "flex", flexWrap: "wrap"}}>
                {shooted.map((item)=>{return <div key={item.color} onClick={()=>removeballoon(item)} style={{backgroundColor: "#" + item.color, height: "100px", width: "100px", border: "1px solid black", borderRadius: "50px",marginRight:"10px"}}></div>})}
            </div>
            <div className="balloons_div" style={{display: "flex", flexDirection: "column"}}>
                {color_balloons.map((random)=>
                    <div id={random.id} key ={random.color}>
                    <div   style={{backgroundColor: "#" + random.color, height: "100px", width: "100px", border: "1px solid black", borderRadius: "50px",marginBottom:"10px"}} ></div>
                </div>)}
            </div>
            <div className='shoot_div'>
                <input type="number" value={value} placeholder='Enter number based on circles available' onChange={(e)=>{setValue(e.target.value)}}/>
                <button onClick={handleClick}>Shoot</button>
            </div>
        </div>
  )
}
