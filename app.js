import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import firebase from 'firebase'
import ReactModel from 'react-modal'


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBMAKkgR5UZQ5KLrVDvTo1U6guDwEkB4Ho",
    authDomain: "fikrafirst-3ac64.firebaseapp.com",
    databaseURL: "https://fikrafirst-3ac64.firebaseio.com",
    projectId: "fikrafirst-3ac64",
    storageBucket: "fikrafirst-3ac64.appspot.com",
    messagingSenderId: "929656871361"
  };
  firebase.initializeApp(config);

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
  

  let Job = styled.div`
  height: 80px;
  border: 1px solid;
  background: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 2rem;
  margin-top: 20px;
`
let Context = React.createContext()

class Header extends React.Component {

    constructor(){
      super()
      this.state = {
        jobs: [{},{},{}]
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
                           Ficracamps
                         </h1>
                        

                        <TextInput onChange={(event)=>{ctx.actions.onChangeCompanyName(event.target.value)}} 
                         value={ctx.state.company_name}
                           placeholder="Company Name"  type="text"/>

                        <TextInput value={ctx.state.title} 
                        onChange={(event)=>{ctx.actions.onChangeTitle(event.target.value)}} 
                         placeholder="Title" type="text"/> 

                         <Button onClick={()=>{

                    firebase.firestore().collection('jobs').add({
                      company_name: ctx.state.company_name,
                      title: ctx.state.title,
                      date: Date.now()
                    }) 
                    ctx.actions.toggle()
                    }}>save</Button>
                            </ReactModel>
                           <img width="120px" src= {require('./assest/logo.png')}/>
                           <Button onClick={() => {
                ctx.actions.toggle()
                }}>Post A Job</Button>
                       </Nav>
                   )
               }
           }
          
        </Context.Consumer>
          
     
      )
    }
  }
  
  class JobsList extends React.Component {
    constructor() {
      super()
      this.state = {
        jobs: [{}]
      }
    }
    render() {
      return (
        <Context.Consumer>
          {(ctx)=>{
            return <Container> 
            {ctx.state.jobs.map((item,i)=>{return <Job> {item.title}{i}</Job>
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
      this.state = {jobs:[{}] ,modelState:false}
      let jobs=[]
      firebase.firestore().collection('jobs').onSnapshot((snapShot)=>{
        let jobs=[]

        snapShot.forEach((doc) =>{
          jobs.push(doc.data())
          this.setState({jobs:jobs})

        })
      })
  
      
    }
  
    render() {
      return (
        <Context.Provider value={{
            state: this.state, 
            actions: {
              
              addJob:  ()=>{
                firebase.firestore().collection('jobs').add()
                let jobs = this.state.jobs
              jobs.push({})
                this.setState({ jobs: jobs })
              },
              toggle:()=>{
                this.setState({modelState:!this.state.modelState})
              },
              onChangeTitle: (value) =>{
                this.setState({
                  title: value
                })
              },
              onChangeCompanyName: (value) =>{
                this.setState({
                  company_name: value})}
            }
          }}>
          <Header />
          <JobsList />
        </Context.Provider>
      )
    }
  }
   /*firebase.firestore().collection('jobs').add({title:'php',
  company-name:'google'
   date:Date.now()})
   */
    
        
    
ReactDOM.render(<App/>, document.getElementById('root'))
