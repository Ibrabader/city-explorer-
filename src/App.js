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
    }
  }
  handleChangeOfLocation = (event) => {
    this.setState({ locationInput: event.target.value })
    console.log(this.state.locationInput);

  };
  handleSubmit = async (e) => {
     e.preventDefault();
     console.log(this.state.locationInput);
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONKEY}&q=${this.state.locationInput}&format=json`;
    console.log(url);
    const response = await axios.get(url);
      this.setState ({
      dataArray: response.data[0],
    });
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
       
          <h1> City Name : {this.state.dataArray.display_name}</h1>
          <h1> lat : {this.state.dataArray.lat}</h1>
          <h1> lon : {this.state.dataArray.lon}</h1>
        
          {/* <img src='https://maps.locationiq.com/v3/staticmap?key=<YOUR_ACCESS_TOKEN>&center=<latitude>,<longitude>&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>'> */}
      </div>
    );

  }




};

export default App;