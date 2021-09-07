import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      locationInput: '',
      dataArray: {},
      showLocation : false ,
      WeatherDateAndDescription: {},
      longtitude : '',
      latitude : '',
    }
  }
  
  handleChangeOfLocation = (event) => {
    this.setState({ 
      locationInput: event.target.value,
      
    
    })
    //console.log(this.state.locationInput);

  };


  handleSubmit = async (e) => {

    try{
     e.preventDefault();
    //  console.log(this.state.locationInput);
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONKEY}&q=${this.state.locationInput}&format=json`;
    const image = 'GET https://maps.locationiq.com/v3/staticmap';
    const url2 = `http://localhost:3004/weather?lat=${this.state.latitude}&lon=${this.state.longtitude}`

    // console.log(url);
    const response = await axios.get(url);
    const res =  await axios.get(url2);
    console.log('url of API '+url2);
    console.log(this.state.latitude);

     this.setState ({
    showLocation : true,
    dataArray: response.data[0],
    WeatherDateAndDescription : res,
    longtitude : response.data[0].lon,
    latitude : response.data[0].lat,
    
  });
  console.log(this.state.latitude);
  console.log(this.state.WeatherDateAndDescription.data[0].datetime); 
  // console.log(this.state.WeatherDateAndDescription.data.description); 
  
  }
    catch {
     console.log('error');

    }
  };




  render() {


    return (
      <div>
        <Form onSubmit={this.handleSubmit}  >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> City Name</Form.Label>
            <Form.Control onChange={this.handleChangeOfLocation} type="text" placeholder="Enter city" />
            <Form.Text className="text-muted">
              Enter the name of the city your looking to explore
            </Form.Text>
          </Form.Group>
          <Button  variant="primary" type="submit"  >
            Explore !
          </Button>
        </Form>
        
       {this.state.showLocation && <div><h1> City Name : {this.state.dataArray.display_name}</h1>
          <h1> lat : {this.state.dataArray.lat}</h1>
          <h1> lon : {this.state.dataArray.lon}</h1>
        
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONKEY}&center=${this.state.dataArray.lat},${this.state.dataArray.lon}&zoom=<zoom>&size=300x300`} /></div> }
          <div>
          <p>{this.state.WeatherDateAndDescription.date}</p>
          <p>{this.state.WeatherDateAndDescription.description}</p>
          {/* <p>{this.state.WeatherDateAndDescription.description}</p> */}
          
          </div>
      </div>

    );

  }




};

export default App;