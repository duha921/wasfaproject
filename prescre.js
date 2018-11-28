import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import firebase from 'firebase'
import ReactModel from 'react-modal'


  // Initialize Firebase
 
  var config = {
    apiKey: "AIzaSyAkq2JPD-sf6w0b_oVqJYtKTgQOsAZxAWk",
    authDomain: "drugs-cb20a.firebaseapp.com",
    databaseURL: "https://drugs-cb20a.firebaseio.com",
    projectId: "drugs-cb20a",
    storageBucket: "drugs-cb20a.appspot.com",
    messagingSenderId: "901930522344"
  };

  
  firebase.initializeApp(config)


let TextInput=styled.input`
border:1px solid #000;
width:100%;
display :block;
hieght=40px;
margin:10px 10px;
font-size: 1.4rem;
`
let Nav =styled.header`

    height: 100px;
    background-color: #fff;
    box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.5);
    display: flex;
    padding: 0 10%;
    align-items: center;
    justify-content: space-between;
   

`
let Button = styled.button`
  background-color: #466AB3;
  padding: 10px;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  min-width: 100px;
  margin:10px 10%;
`
let Container = styled.main`
  background-color: red;
  min-height: 500px;
  padding: 10px 10%;`
  

  let Out= styled.div`
  height: 80px;
  border: 1px solid;
  background: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space_between;
  font-family: sans-serif;
  font-size: 1.5rem;
  margin-top: 20px;
`
let Name=styled.div
`height: 60px;
display: flex;
font-weight:bold;
justify-content: center;
font-family: sans-serif;
font-size: 2rem;
margin: 10px;
align-items: center
`
let Context = React.createContext()

class Header extends React.Component {
    constructor(){
        super()
        this.state = {
          drugs: [{},{},{}]
        }
      }
    
      render() {
        return (
      
       <Context.Consumer>
             {
                 (ctx)=>
                 {
                     return (
                         <Nav>
                           <ReactModel isOpen={ctx.state.modelState}>
                           
                           <h1>
                             wasfa
                           </h1>
                          
  
                          <TextInput onChange={(event)=>{ctx.actions.onChangePatientName(event.target.value)}} 
                           value={ctx.state.Patient_name}
                             placeholder="Patient name"  type="text"/>
  
                          <TextInput value={ctx.state.Age} 
                          onChange={(event)=>{ctx.actions.onChangeAge(event.target.value)}} 
                           placeholder="Age" type="text"/> 

                             <TextInput value={ctx.state.pre} 
                          onChange={(event)=>{ctx.actions.onChangePre(event.target.value)}} 
                           placeholder="drugs" type="text"/> 


                           <Button onClick={()=>{
  
                      firebase.firestore().collection('drugs').add({
                        Patient_name: ctx.state.Patient_name,
                        Age: ctx.state.Age,
                        Pre:ctx.state.pre,
                        date: Date.now()
                      }) 
                      ctx.actions.toggle()
                      }}>save</Button>
                              </ReactModel>
                             <img width="120px" src= {require('./assest/logo.png')}/>
                             <Button onClick={() => {
                  ctx.actions.toggle()
                  }}>print prescription</Button>
                         </Nav>
                     )
                 }
             }
            
          </Context.Consumer>
            
       
        )
      }
    
}
class PatientList extends React.Component {
    constructor() {
      super()
      this.state = {
        drugs: [{}]
      }
    }
    render() {
      return (
        <Context.Consumer>
          {(ctx)=>{
            return <Container> 
            {ctx.state.drugs.map((item,i)=>{return <Out>
                 <Name>{item.Patient_name}: </Name> 
                 {item.Pre}</Out>
        })
    }
    </Container>
          }}
        </Context.Consumer>
      )
    }
  }
class App extends React.Component {

    constructor(){
      super()
      this.state = {drugs:[{}] ,modelState:false}
      let drug=[]
      firebase.firestore().collection('drugs').onSnapshot((snapShot)=>{
        let drug=[]

        snapShot.forEach((doc) =>{
          drug.push(doc.data())
          this.setState({drugs:drug})

        })
      })
  
      
    }
  
    render() {
      return (
        <Context.Provider value={{
            state: this.state, 
            actions: {
              
              addpre:  ()=>{
                firebase.firestore().collection('drugs').add()
                let drug= this.state.drug
                drug.push({})
                this.setState({ drug: drug })
              },
              toggle:()=>{
                this.setState({modelState:!this.state.modelState})
              },
              onChangeAge: (value) =>{
                this.setState({
                  Age: value
                })
              },
              onChangePatientName: (value) =>{
                this.setState({
                    Patient_name: value})}
                    ,
                    onChangePre:(value) =>{
                     this.setState({pre:value})
                    }
            }
          }}>
          <Header />
          <PatientList />
        </Context.Provider>
      )
    }
  }
   /*firebase.firestore().collection('jobs').add({title:'php',
  company-name:'google'
   date:Date.now()})
   */
    
        
    
ReactDOM.render(<App/>, document.getElementById('root'))
