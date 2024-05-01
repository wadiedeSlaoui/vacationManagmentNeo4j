import React, { Component } from 'react'
import collaboratorService from '../../servicees/CollaborateurServices';
import dateFormat from "dateformat";
import {FormattedMessage} from "react-intl";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import {
    Row,
    Button
   
  } from "react-bootstrap";
  
class addCollaborator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
             
            firstname:"",
            lastname:"",
            
            birthday:"",
            adresse:"",
            password:"",
            email:"",
            username:"",
            country:"" ,
            experience:"",
            annualBalance:"",
            cumulativeBalance:"",
            remainder:"",
            soldes:[],
            years:"",
            balance:""       
        }
        
        this.changefirstnameHandler =this.changefirstnameHandler.bind(this);
        this.changelastnameHandler =this.changelastnameHandler.bind(this);
        this.changeageHandler =this.changeageHandler.bind(this);
        this.changeadresseHandler =this.changeadresseHandler.bind(this);
        this.changepasswordHandler =this.changepasswordHandler.bind(this);
        this.changeusernameHandler = this.changeusernameHandler.bind(this);
        this.changecountry_workHandler=this.changecountry_workHandler.bind(this);
        this.changeemailHandler=this.changeemailHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
        this.changeexperienceHandler = this.changeexperienceHandler.bind(this);
        this.changeannualBalanceHandler =this.changeannualBalanceHandler.bind(this);
        this.changeremainderHandler=this.changeremainderHandler.bind(this);
        this.soldess=this.soldess.bind(this);
        this.deletelist=this.deletelist.bind(this);
        this.changeBalance=this.changeBalance.bind(this);
        this.changeYear=this.changeYear.bind(this)

    }

    // get collaborator formation if user click in update
    componentDidMount(){
        this._isMounted = true;
        
        if(this.state.id === ':id'){
            return
        }else{
            collaboratorService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
              
                this.setState({
                    id:user.id,
                      
                    firstname:user.firstname,
                    lastname:user.lastname,
                   
                    birthday:user.birthday,
                    adresse:user.adresse,
                    email:user.email,
                    password:user.password,
                    username:user.username,
                    country:user.country,
                    annualBalance:user.solde.annualBalance,
                    experience:user.experience,
                    remainder:user.solde.remainder,
                    soldes: user.solde.cumulativeBances
                    
                });
            });
        }
    }
    //errors for  formation not inputed
    errors = (x) =>{
           
            document.querySelector('.'+x).style.display = "block";  
            setTimeout(function(){document.querySelector("."+x).style.display = "none"},10200)
            document.querySelector(".error").style.display = "inline-block";  
            setTimeout(function(){document.querySelector(" .error").style.display = "none"},10200)

    }
    saveOrUpdateUser = (e) => {
        this._isMounted = true;
             e.preventDefault();
        if(this.state.firstname==="" ){
           this.errors('firstname')
        }else if(this.state.lastname === ""){
            this.errors('lastname')
        }else if(this.state.password === ""){
            this.errors('password')
        }else if(this.state.email === ""){
            this.errors('email')
        }else if(this.state.experience === ""){
            this.errors('experience')
        }
        else if(this.state.birthday === ""){
            this.errors('birthday')
        }
        else if(this.state.username === ""){
            this.errors('username')
        }else if(this.state.country === ""){
            this.errors('country')
        }else if(this.state.remainder === ""){
            this.errors('remainder')
        }    
        else{
        let user = {  
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            
            birthday:this.state.birthday,
            adresse:this.state.adresse,
            username:this.state.username,
            country:this.state.country,
            email:this.state.email,
            experience:this.state.experience,
            solde:{
                annualBalance:this.state.annualBalance,
                remainder:this.state.remainder,
                cumulativeBances:this.state.soldes
            }
        
        };

        
            if (this.state.id === ":id") {
                user.password = this.state.password;
                let newone = collaboratorService.getUserByUsername(user.username).then(res => {
                     if (!res.data) {
                        console.log(res.data)
                         let varificationemail = collaboratorService.getUserByEmail(user.email).then(res => {
                              console.log(res.data)
                             if (!res.data) {
                                   collaboratorService.createUser(user).then(res => {
                                    console.log(res.data)
                                    this.props.history.push('/admin/list/Collaborator');
                                   });
                             }
                             else {
                                   alert("Email "+ user.email+" already exist,choose another one");
                                  }
                         })
                   
                   }else {
                         alert("User name" + user.username + " already exist,choose another one");
                         if (!res.data) {
                                   collaboratorService.createUser(user).then(res => {
                                   console.log(res.data)
                                  this.props.history.push('/admin/list/Collaborator');
                                   });
                             }
                             else {
                                   alert("Email "+ user.email+" already exist,choose another one");
                                  }
                      }
                });
               
               
                
            }else{
                collaboratorService.updateUser(user, this.state.id).then(res => {
                    this.props.history.push('/admin/list/Collaborator');
                });
            }
        }
        
        
    }
    
    

    changeageHandler= (event) => {
        this.setState({birthday: event.target.value});
    }

    
    changefirstnameHandler= (event) => {
        this.setState({firstname: event.target.value});
    }

    changelastnameHandler= (event) => {
        this.setState({lastname: event.target.value});
    }
    changepasswordHandler= (event) => {
        this.setState({password: event.target.value});
        
    }
    changeadresseHandler= (event) => {
        this.setState({adresse: event.target.value});
    }
    changeunite_organisationelleHandler= (event) => {
        this.setState({unite_organisationelle: event.target.value});
    }
    changeusernameHandler= (event) => {
        this.setState({ username: event.target.value });
      
    }
    changecountry_workHandler= (event) => {
        this.setState({country: event.target.value});
    } 
    changeexperienceHandler= (event) => {
        this.setState({experience: event.target.value});
    }
   
    
    changeannualBalanceHandler= (event) => {
        this.setState({annualBalance: event.target.value});
       
    }
    changeremainderHandler= (event) => {
        this.setState({remainder: event.target.value});
    }
    changeemailHandler = (event) =>{
        this.setState({email:event.target.value});
    }
    changeBalance =(event)=>{
        this.setState({balance:event.target.value});
    }
    changeYear =(event)=>{
        this.setState({years:event.target.value});
    }
    cancel(){
        this.props.history.push('/admin/list/collaborator');
    }
    getTitle(){
        if(this.state.id === ":id"){
            return <h3 className="text-center"></h3>
        }else{
            return <h3 className="text-center"></h3>
        }
    }
    //table of comulative balance
    soldess(){
        if(this.state.soldes!=[] && this.state.soldes!=null){
          
          return (
            <table className = "table table-striped table-bordered" style={{padding:"0px",margin:"0px"}}>
                              <thead>
                                  <tr>
                                      <th>  Years</th>
                                      <th>Balance</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {   
                                      this.state.soldes.map(
                                          
                                          (balance,index) => 
                                         
                                          <tr key = {index} >
                                              <td> {balance.year}</td>
                                              <td> {balance.balance}</td>
                                              <td><button onClick={(e)=> {e.preventDefault(); this.deletelist(index)}} className="btn btn-danger"> X </button></td>
                                              
                                          </tr>
                                      )
                                  }
                              </tbody>
                          </table>
          );
        
      }
      }
      //delete a comulative balance
      deletelist(i){
        this.state.soldes.splice(i,1)
        this.setState({soldes:this.state.soldes})
      }
      //add comuulative balance
      add(){
        
            
           
              
            let DateReq={
              year:this.state.years,
              balance:this.state.balance
              
            }
            if(this.state.soldes==null){this.state.soldes=[]}
            this.state.soldes.push(DateReq)
            this.setState({soldes:this.state.soldes})
            
            
      }
    render() {
      
        return (
           
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                    
                                        
                                        <div className = "form-group">
                                            <label>  <FormattedMessage id="FirstName" />: </label>
                                            <input placeholder="First Name" name="firstname" className="form-control" 
                                                value={this.state.firstname} onChange={this.changefirstnameHandler}/>
                                                <div className="hidden-error text-danger firstname" style={{display:"none"}}>
                                                    Enter the first name.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('LastName')}: </label>
                                            <input placeholder="Last Name" name="lastname" className="form-control" 
                                                value={this.state.lastname} onChange={this.changelastnameHandler}/>
                                                <div className="hidden-error text-danger lastname" style={{display:"none"}}>
                                                    Enter the Last Name.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('birthday')}: </label>
                                            <input placeholder="birthday" name="birthday" className="form-control" 
                                                type="date"  value={this.state.birthday} onChange={this.changeageHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('address')}: </label>
                                            <input placeholder="address" name="adress" className="form-control" 
                                                value={this.state.adresse} onChange={this.changeadresseHandler}/>
                                            <div className="hidden-error text-danger address" style={{display:"none"}}>
                                                    Enter the address.
                                                </div>                                        
                                        </div>
                                        <div className = "form-group">
                                            <label>{translate('password')}: </label>
                                            <input placeholder="password" name="password" className="form-control" 
                                                 onChange={this.changepasswordHandler}/>
                                                 <div className="hidden-error text-danger password" style={{display:"none"}}>
                                                    Enter the password.
                                                </div> 
                                        </div>
                                       
                                        <div className = "form-group">
                                            <label> {translate('username')}: </label>
                                            <input placeholder="username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeusernameHandler}/>
                                                <div className="hidden-error text-danger username" style={{display:"none"}}>
                                                    Enter the username.
                                                </div> 
                                        </div>
                                        <div className = "form-group">
                                            <label>{translate('country work')}: </label>
                                            <input placeholder="country work" name="country_work" className="form-control" 
                                                value={this.state.country} onChange={this.changecountry_workHandler}/>
                                                <div className="hidden-error text-danger country" style={{display:"none"}}>
                                                    Enter the country.
                                                </div> 
                                        </div>
                                        <div className = "form-group">
                                            <label>{translate('Experience')}: </label>
                                            <input placeholder="country work" name="country_work" className="form-control" 
                                                value={this.state.experience} onChange={this.changeexperienceHandler}/>
                                                <div className="hidden-error text-danger experience" style={{display:"none"}}>
                                                    Enter the experience.
                                                </div> 
                                        </div>
                                        <div className = "form-group">
                                            <label>{translate('Email')}: </label>
                                            <input placeholder="email" name="email" className="form-control" type="email" 
                                                value={this.state.email} onChange={this.changeemailHandler}/>
                                                <div className="hidden-error text-danger email" style={{display:"none"}}>
                                                    Enter the email.
                                                </div> 
                                        </div>
                                        <div className = "form-group">
                                            <h3 style={{color:"silver",textAlign:"center"}} onClick={this.add.bind(this)} >{translate('Balance')}</h3>
                                            <Button className="btn btn-success"  style={{marginLeft: "10px",float:"right"}} onClick={this.add.bind(this)}> Add</Button>
                                            <div className = "form-group" style={{display:"flex"}}>
                                            <div className = "form-group col-6">
                                            <label>{translate('Years')}: </label>
                                            <input placeholder="Years"  className="form-control" onChange={this.changeYear} 
                                                />
                                                </div>
                                                <div className = "form-group col-6">
                                                <label>{translate('Balance')}: </label>
                                            <input placeholder="Balance"  className="form-control" onChange={this.changeBalance}/>
                                            
                                                 </div>
                                                  
                                                 </div>
                                                 {this.soldess()}
                                            <div className = "form-group">
                                                <label>{translate('Annual Balance')}: </label>
                                                <input placeholder="country work" name="country_work" className="form-control" 
                                                    value={this.state.annualBalance} onChange={this.changeannualBalanceHandler}/>
                                            </div>
                                           
                                            <div className = "form-group">
                                                <label>{translate('Remainder')}: </label>
                                                <input placeholder="country work" name="country_work" className="form-control" 
                                                    value={this.state.remainder} onChange={this.changeremainderHandler}/>
                                                    <div className="hidden-error text-danger remainder" style={{display:"none"}}>
                                                    Enter the remainder.
                                                </div> 
                                            </div>
                                            
                                        </div>
                                        <button className="btn btn-success"  onClick={this.saveOrUpdateUser}>{translate('Save')}</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>{translate('Cancel')}</button>
                                        <span className="hidden-error text-danger error" style={{display:"none" , paddingLeft:"20px"}}>Error</span>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
             
        )
    }
}

export default addCollaborator 