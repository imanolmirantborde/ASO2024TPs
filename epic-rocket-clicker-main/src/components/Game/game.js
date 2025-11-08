import { click } from "@testing-library/user-event/dist/click";
import React, { Component, useState } from "react";
import { ReactDOM } from "react";
import DisplayBoard from "../GameElements/displayClicks";
import Upgrade from "../GameElements/Upgrade_frame";
import { useEffect } from "react";
import { notify, green_notify } from "../Alerts/toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import images from "../Images";
import './game.css';
import { Container, Row, Col, Carousel  } from "react-bootstrap";
import ProgressBar from "../StockBar/StockProgressBar";
import Stockstation from "../ModalComponents/StockStation";
import Custom from "../ModalComponents/Custom";
import Casino from "../ModalComponents/Casino";





 class Game extends Component {
    constructor(props)
    {
        super(props);
     

        this.state = {
            click: 0,

            Demand: 1,

            level: 1,
            
            Stock: 100,

            StockMax: 100,

            capacityPrice: 10,

            Stock_usage: 0.6,

            Stock_price: 1,

            xp: 0,

            xp_to_nxt: 50,
            
            item_price: [100, 300, 600, 800, 950, 1900, 2800, 5000, 10000000],

            item_name: ["Tapita", "Dulce de leche", "Coco rallado"],

            item_amount: [0, 0 ,0, 0, 0 ,0, 0, 0, 0],

            item_Demand: [1, 3, 5, 7, 12, 14, 21, 49, '100k'],

            item_fusage: [0.1, 0.2, 0.3,   0.5, 1, 1.2, 2, 4, 0],

            item_minStock: [50, 100, 150,  300, 450, 600, 1800, 2500, 5000 ],


            casino_multiplier: 0,

            casino_stake: 500,
            
          
           
        };
        this.AddPoints = this.AddPoints.bind(this);
        this.ChangePoints = this.ChangePoints.bind(this);
        this.BuyUpgrade = this.BuyUpgrade.bind(this);
        this.lvlSystem = this.lvlSystem.bind(this);
        this.SubstractStock = this.SubstractStock.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.ReStock = this.reStock.bind(this);
        this.BuyCapacity = this.BuyCapacity.bind(this);
        this.SetCasinoMuliplier = this.SetCasinoMuliplier.bind(this);
        this.AddCasinoStake = this.AddCasinoStake.bind(this);
        this.SubstractStake = this.SubstractStake.bind(this);
        this.StartCasino = this.StartCasino.bind(this);
        this.CasinoWin = this.CasinoWin.bind(this);
        this.DefaultCasinoVal = this.DefaultCasinoVal.bind(this);
        

       
        
    }

    StartCasino()
    {

        let checkPossiblity = this.state.click - this.state.casino_stake;
        
        if(this.state.casino_multiplier != 0 && checkPossiblity > 0)
        {
           this.ChangePoints(this.state.casino_stake);
           let randomnmbr = this.getRandomInt(0, 100);
           
           this.CasinoWin(this.state.casino_multiplier, this.state.casino_stake, randomnmbr);
           




        }
        else {
            notify("You can't play... Check stake or select multiplier");
        }

        this.DefaultCasinoVal();
    }

    CasinoWin(x, y, z)
    {
        let winval = x * y;
        
        if(x == 1.25)
        {
            if(z <= 33)
            {
                this.ChangePoints(-winval);
                

                notify("You win. Your award: " + winval);
            }
            else {
                notify("You lose... Try again :-D");
               
            }
        }

        if(x == 1.50)
        {
            if(z <= 20)
            {
                this.ChangePoints(-winval);
            

                notify("You win. Your award: " + winval);
            }
            else {
                notify("You lose... Try again :-D");
               
            }
        }

        if(x == 2)
        {
            if(z <= 10)
            {
                this.ChangePoints(-winval);


                notify("You win. Your award: " + winval);
            }
            else {
                notify("You lose... Try again :-D");
               
            }
        }

        
    }

    DefaultCasinoVal()
    {
        this.setState(() => {
            return {
                casino_stake: 500,
                casino_multiplier: 0
            }
        })
        
    }

    SubstractStake()
    {
        if(this.state.casino_stake > 500)
        {
            this.setState((prevState) => {
                return {
                    casino_stake: prevState.casino_stake - 500,
                }
            })
        }
        else {
            notify("Minimum stake-value is 500!")
        }
    }


    AddCasinoStake() 
    {
       
            this.setState((prevState) => {
                return {
                    casino_stake: prevState.casino_stake + 500,
                }
            })


    }

    SetCasinoMuliplier(mltp)
    {
        this.setState((prevState) => {
            return {
                casino_multiplier: mltp
            }
        })

        

    }

    BuyCapacity(capVal)
    {
        if(this.state.capacityPrice * capVal < this.state.click)
        {
            this.setState((prevState) => {
                return {
                    StockMax: prevState.StockMax + capVal,
                    click: prevState.click - (this.state.capacityPrice * capVal)
                }
            })
        }
        else {
            notify("You can't buy it");
        }
    }
    reStock(TankValue)
    {
        let FullCost = Math.round(((this.state.StockMax - this.state.Stock) * this.state.Stock_price)*100)/100;
        let checkpwrs = '';
        if(this.state.Stock + TankValue < this.state.StockMax)
        {
            checkpwrs = true;
        }
        else {
            checkpwrs = false;
        }

        if(TankValue == "MAX")
        {
            if(FullCost <= this.state.click)
            {
             this.setState((prevState) => {
                    return {
                        click: prevState.click - FullCost,
                        Stock: this.state.StockMax
                     }
                  })
            }

        }
        else {
            if(this.state.StockMax > this.state.Stock && this.state.click > this.state.Stock_price * TankValue && checkpwrs) 
            {
            this.setState((prevState) => {
                return {
                    click: prevState.click - this.state.Stock_price * TankValue,
                    Stock: prevState.Stock + TankValue
                 }
              })

            }
             else {
              notify("You can't buy more Stock....")
            }
        }



        
        
     
    }

    SubstractStock()
    {
        this.setState((prevState) => {
            return {
                Stock: prevState.Stock - this.state.Stock_usage
            }
        })
    }

    
    
    async lvlSystem()
    {
       

        if(this.state.xp >= this.state.xp_to_nxt)
        {
        
        this.setState((prevState) => {
            
                return {
                    xp: 0,
                    level: prevState.level+ 1,
                    xp_to_nxt: prevState.xp_to_nxt + 100,
                    Stock_price: prevState.Stock_price + 0.5,
                    capacityPrice: 10 * this.state.Stock_price
                }
            
        })
        let lvl = this.state.level + 1;
        green_notify("You have reached the level " + lvl + "!");
    }
        
        

    }

   ChangePoints(val) 
   {
    this.setState((prevState) => {
        return {
            click: prevState.click - val,
        }
    })

   }
    AddPoints() {
        let StockSim = this.state.Stock - this.state.Stock_usage;

        if(StockSim > 0)
        {
            this.lvlSystem();
            this.SubstractStock();
            this.setState((prevState) => {
                return {
                    click: prevState.click + this.state.Demand,
                    xp: prevState.xp + 2
                }
            })

        }
        else {
            notify("You don't have Stock!");
        }
     
               
    }

    BuyUpgrade(y) 
    {
        let CheckStockMax = this.state.StockMax;
        let price = this.state.item_price[y];
        let Demand = this.state.item_Demand[y];
        let addfusage = this.state.item_fusage[y];
        let minimumStock = this.state.item_minStock[y];
        const CopyAmonut = this.state.item_amount.slice();



        if(this.state.click >= price && minimumStock <= CheckStockMax)
        {
            if(y < 8)
            {
              CopyAmonut[y] += 1;
            
              this.setState((lastState) => {
                return {
                    click: lastState.click - price,
                    Demand: lastState.Demand + Demand,
                    Stock_usage: Math.round((lastState.Stock_usage + addfusage) * 100)/100,

                    item_amount: CopyAmonut
                    
                    
                }
            })

            }
            if(y >= 8)
            {
                this.setState((lastState) => {
                    return {
                        

                        click: 0,

                        Demand: 1,
            
                        level: 1,
                        
                        Stock: 80,
            
                        StockMax: 100,
            
                        capacityPrice: 10,
            
                        Stock_usage: 1,
            
                        Stock_price: 2,
            
                        xp: 0,

                        item_amount: [0, 0 ,0, 0, 0 ,0, 0, 0, 0],

                        

                        
            
                        
                        
                    }
                })
                
                
            }
            
           

        }
        else {
            notify("💸 You can't buy this item");
        }

    }

     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }



    render() 
    {
        const { click  } = this.state;
        const tanklvl = Math.round(( this.state.Stock / this.state.StockMax) * 100);

        return( 
        <> 
        

        <div className="fullscreen">
            

            
           
             <center>  <DisplayBoard avatar={images.avatar1} clicks={ Math.round(click * 100)/100} event={this.AddPoints} Demand={this.state.Demand} lvl={this.state.level} xp={this.state.xp} xp2={this.state.xp_to_nxt}/> 
             <br/>

             <Container> 
             <Row>

             <Col> 
             <Stockstation Btn1={() => this.reStock(1)} Btn2={() => this.reStock(10)} Btn3={() => this.reStock("MAX")}  price={this.state.Stock_price} tanklevel={tanklvl}/>
             </Col>
             <Col><Custom price={this.state.capacityPrice} btn1={() => this.BuyCapacity(50)}   btn2={() => this.BuyCapacity(100)}   btn3={() => this.BuyCapacity(500)}/></Col>
             <Col>


             <Casino 
             lvl={this.state.level}
             multiplier={this.state.casino_multiplier}
             mltp1={() => this.SetCasinoMuliplier(1.25)}
             mltp2={() => this.SetCasinoMuliplier(1.50)}
             mltp3={() => this.SetCasinoMuliplier(2.00)}
             addStake={this.AddCasinoStake}
             subStake={this.SubstractStake}
             stake={this.state.casino_stake}
             play={this.StartCasino}
             />
             
             
             </Col>
             </Row>
             </Container>

            <br/>
    
            <Container>  
            <Row> 
          
            <Col> <Upgrade name={this.state.item_name[0]} cost={this.state.item_price[0]} amount={this.state.item_amount[0]} buy={() => this.BuyUpgrade(0)} bg={ images.upgrade1 } pwr={this.state.item_Demand[0]}  click={this.state.click} minStock={this.state.item_minStock[0]} StockUsage={this.state.item_fusage[0]} fmax={this.state.StockMax}/></Col>
            <Col> <Upgrade name={this.state.item_name[1]} cost={this.state.item_price[1]} amount={this.state.item_amount[1]} buy={() => this.BuyUpgrade(1)} bg={ images.upgrade2 } pwr={this.state.item_Demand[1]}  click={this.state.click} minStock={this.state.item_minStock[1]} StockUsage={this.state.item_fusage[1]} fmax={this.state.StockMax}/> </Col>
            <Col> <Upgrade name={this.state.item_name[2]} cost={this.state.item_price[2]} amount={this.state.item_amount[2]} buy={() => this.BuyUpgrade(2)} bg={ images.upgrade3 }   pwr={this.state.item_Demand[2]}  click={this.state.click} minStock={this.state.item_minStock[2]} StockUsage={this.state.item_fusage[2]} fmax={this.state.StockMax}/>  </Col> 
          

            </Row>
            </Container>

            <br/>
            <ProgressBar completed={Math.round(this.state.Stock/this.state.StockMax * 100)} StockMax={this.state.StockMax}  StockUsage={this.state.Stock_usage}/>
           
            </center> 

        </div> </>)
    }
}

export default Game;