import React from "react";
import { Modal, Dialog } from "bootstrap";
import { useState, useEffect } from "react";
import './modalTemplate.css';
import {Container, Row, Col,} from "react-bootstrap";
import {Carousel} from "react-bootstrap";
function Stockstation(props)
{
    const [show, SetShow]  = useState(false);
    const TriggerBtn = () =>
    {
        SetShow(!show);
    }
   
    
    useEffect(()=> {
        const modalDiv = document.getElementById('modDiv');

        if(show)
        {
            modalDiv.style.display = 'inherit';
          
    
        }
    
        else {
            modalDiv.style.display = 'none';
    
        }
    })



   

    return(
        <div> 
        <button className="btn btn-secondary btn-lg" onClick={TriggerBtn}>Stock Station!</button>
       <div id="modDiv" className="modal">
           <div className="modal-content">

           <div>
           <button className="btn btn-danger closeBtn"  onClick={TriggerBtn}>X</button>




         <div className="ModalTxt">
         <h1>ReStock Station</h1>
         <h2>Stock level:</h2>
         <h3 className="StockTextInfo">{props.tanklevel}%</h3>
         <h2>1 Stock price: </h2> <h3 className="StockTextInfo">{props.price} clicks</h3>
      
         <Container> 
         <br/> <br/>
         <Row>
         <Col> <button className="btn btn-primary" onClick={props.Btn1}><h1>ReStock 1</h1></button></Col> 
         <Col> <button className="btn btn-primary" onClick={props.Btn2}><h1>ReStock 10</h1></button></Col> 
         <Col> <button className="btn btn-primary" onClick={props.Btn3}> <h1>ReStock MAX</h1></button></Col> 
         </Row>
        
         </Container>
        
       
         </div>



         </div>
         </div>

       </div>
      
        </div>
    )
}
export default Stockstation;