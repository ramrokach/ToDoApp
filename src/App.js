import React from 'react';
//import logo from './logo.svg';
import './App.css';


class Summary extends React.Component{
  constructor(props){
    super(props)
    this.handleActive=this.handleActive.bind(this);
    this.handleCompleted=this.handleCompleted.bind(this);
    this.handleAll=this.handleAll.bind(this);
    this.state={color:[],all:true}
  }
  changeColor(btn1,btn2,btn3){
    let arr=[];
    arr[btn1]=true;
    arr[btn2]=false;
    arr[btn3]=false;
    this.setState({color:arr,all:false});
  }

  handleCompleted(){  
    this.changeColor(1,2,0);
    this.props.isActive(0);  
  }

  handleActive(){  
    this.changeColor(0,1,2);  
    this.props.isActive(1);
  }

  handleAll(){
    this.changeColor(2,1,0);  
    this.props.isActive(2);
  }
  render()
  {   
      let btn3;
      if(this.state.all)
          btn3="pressed"
      else
      btn3=this.state.color[2]?"pressed":"none";
      let btn1 = this.state.color[0] ? "pressed" : "none";
      let btn2=this.state.color[1]?"pressed":"none";
      //let active=this.props.listItems.filter((doing)=>!doing.isCheck);
      //let completed=this.props.listItems.length-active.length;
      return(
        <div className="div">
          {/*}{this.props.listItems.length}  active:{active.length}  completed:{completed}*/}
          <button className={btn1} onClick={this.handleActive}>Active</button>
          <button className={btn2} onClick={this.handleCompleted}>Completed</button>
          <button className={btn3} onClick={this.handleAll}>All</button>
          </div>
      )
  }
}

class Draw extends React.Component{
  constructor(props) {
    super(props);
    this.onRemove=this.onRemove.bind(this);
    this.handleCheckboxChang=this.handleCheckboxChange.bind(this);
  }
    onRemove(index){
      this.props.remove(index);
    }
    
    handleCheckboxChange(index)
    {
      this.props.complete(index);
    }

    render()
    {
      let listItems=this.props.listItems;
      if(this.props.isActive===1)
        listItems=this.props.listItems.filter(doing=>!doing.isCheck);
      else if(this.props.isActive===0)
        listItems=this.props.listItems.filter(doing=>doing.isCheck);
      listItems= listItems.map((doing,index) =>
      { 
      let check='';
      if(doing.isCheck)
          check="checkbox";
      return(
        <li id={doing.id} className={check}>{doing.value} 
      <input name="input" checked={doing.isCheck} onChange={(e)=>this.handleCheckboxChang(doing.id)} type="checkbox"/>
      <button onClick={()=>this.onRemove(doing.id)}>
      remove
      </button>
      </li>)})

    return(
      <ul >
        {listItems}
      </ul>
    )
  } 
}
 
class Todo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      list:[],
      isActive:2
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
    this.handleIsCompleted=this.handleIsCompleted.bind(this);
    this.handleActive=this.handleActive.bind(this);
  }
  
  handleChange(event){
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //const value=this.state.value;
    if(this.state.value!=='')
      this.setState({value:'',list:this.state.list.concat([{value:this.state.value,isCheck:false,id:Math.floor(Math.random() * 1000)}])});
      event.preventDefault();
  }
  handleRemove(index){
    let arr=this.state.list;
    index=arr.find(element=>element.id===index);
    index=arr.indexOf(index);
    arr.splice(index,1)
    this.setState({list:arr});
  }
  handleIsCompleted(index){
    let arr=this.state.list;
    index=arr.find(element=>element.id===index);
    index=arr.indexOf(index);
    let isComplete=!this.state.list[index].isCheck;
    let copy=[...this.state.list];
    copy[index].isCheck=isComplete;
    this.setState({list:copy});
  }

    handleActive(index){
      this.setState({isActive:index})
    }

    componentWillMount(){
      console.log("Mount");
      localStorage.getItem('list')&&this.setState({list:JSON.parse(localStorage.getItem('list'))})
    }
    componentDidUpdate(props,state){
      console.log("update");
      localStorage.setItem('list',JSON.stringify(state.list))
    }
    
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          <h3>What needs to be done?</h3>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="button" type="submit" value="ENTER" />
        <Draw isActive={this.state.isActive} listItems={this.state.list} remove={this.handleRemove} complete={this.handleIsCompleted} />
        <Summary listItems={this.state.list} isActive={this.handleActive}/>
      </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>TO DO APPLICATION</h1>
      <Todo/>
    </div>
  );
}

export default App;
