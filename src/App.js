import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationInput: '',
      dataArray: {},
      showLocation : false ,
      WeatherDateAndDescription: [],
      moviesDetail : [],
    }
  }
  handleChangeOfLocation = (event) => {
    this.setState({ 
      locationInput: event.target.value,
    })
  };
  handleSubmit = async (e) => {
    try{ e.preventDefault();
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONKEY}&q=${this.state.locationInput}&format=json`;
    const response = await axios.get(url);
     this.setState ({
    showLocation : true,
    dataArray: response.data[0],
  });
  const url2 = `${process.env.REACT_APP_LOCALHOST}/weather?lat=${this.state.dataArray.lat}&lon=${this.state.dataArray.lon}`;
  const res =  await axios.get(url2);
  const url3 = `${process.env.REACT_APP_LOCALHOST}/movies?query=${this.state.locationInput}`;
  const responseMovies = await axios.get(url3);
  this.setState ({
    WeatherDateAndDescription : res.data,
    moviesDetail : responseMovies.data, 
  })
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
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONKEY}&center=${this.state.dataArray.lat},${this.state.dataArray.lon}&zoom=<zoom>&size=500x500`} /></div> }
          <div>
          { this.state.WeatherDateAndDescription.map(item => {
           return (
            <> 
            <p>{item.datetime}</p>
          <p>{item.description}</p>
          </>)
          })}
          { this.state.moviesDetail.map(item => {
            return (
             <Card style={{ width: '18rem' }}>
             <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt='' />
             <Card.Body>
               <Card.Title>{item.title}</Card.Title>
               <Card.Text>
               overview: {item.overview}
               </Card.Text>
               <Card.Text>
               vote_average: {item.vote_average}
               </Card.Text>
                 <Card.Text>
                 vote_count: {item.vote_count}
               </Card.Text> 
               <Card.Text>
               popularity: {item.popularity} 
               </Card.Text>
               <Card.Text>
               release_date: {item.release_date} 
               </Card.Text>
             </Card.Body>
           </Card>
            )
          })}
      </div>
      </div>
    );
  }
};
export default App;