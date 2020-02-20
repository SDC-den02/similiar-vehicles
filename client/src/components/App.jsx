import React from 'react';
import SimilarVehicles from './SimilarVehicles.jsx';
import Form from './Form.jsx';

class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            similarVehicles: [], 
            hoverOne: false, 
            hoverTwo: false, 
            hoverThree: false,
            isLoading: false
        }; 

        this.onMouseOutOne = this.onMouseOutOne.bind(this); 
        this.onMouseOverOne = this.onMouseOverOne.bind(this); 
        this.onMouseOutTwo = this.onMouseOutTwo.bind(this); 
        this.onMouseOverTwo = this.onMouseOverTwo.bind(this); 
        this.onMouseOutThree = this.onMouseOutThree.bind(this); 
        this.onMouseOverThree = this.onMouseOverThree.bind(this); 
        this.getSimilarVehicles = this.getSimilarVehicles.bind(this); 
        this.getAllSimilarVehicles = this.getAllSimilarVehicles.bind(this);
        this.postVehicle = this.postVehicle.bind(this);
        this.updateVehicle = this.updateVehicle.bind(this);
        this.deleteVehicle = this.deleteVehicle.bind(this);
    } 

    componentDidMount() {
        this.getSimilarVehicles();
    } 

    getSimilarVehicles() {
        this.setState({isLoading: true});
        fetch('http://localhost:3008/api/similar_vehicles')
        .then((results) => {
           return results.json()
        })
        .then((data) => {
            this.setState({
                similarVehicles: data.results,
                isLoading: false
            });
        })
        .catch((err) => {
            if (err) {
                console.log("Ecountered Error in getSimilarVehicles", err)
            }
        })

    }; 
    getAllSimilarVehicles() {
        this.setState({isLoading: true});
        fetch('http://localhost:3008/api/similar_vehicles/All')
        .then((results) => {
           return results.json()
        })
        .then((data) => {
            this.setState({
                similarVehicles: data.results,
                isLoading: false
            });
        })
        .catch((err) => {
            if (err) {
                console.log("Ecountered Error in getSimilarVehicles", err)
            }
        })

    }; 
    postVehicle(vehicle) {
        //console.log('app post', vehicle)
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicle)
        }
        fetch('http://localhost:3008/api/similar_vehicles', options)
    }
    deleteVehicle(vehicle) {
        console.log('app delete', vehicle)
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicle)
        }
        fetch('http://localhost:3008/api/similar_vehicles', options)
    }
    updateVehicle(vehicle) {
       //console.log('app update', vehicle)
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicle)
        }
        fetch('http://localhost:3008/api/similar_vehicles', options)
    }
    onMouseOverOne() {
        
        this.setState(
            {
                hoverOne: true
            }
        )
    }; 

    onMouseOutOne() {
        
        this.setState(
            {
                hoverOne: false
            }
        )
    }; 

    onMouseOverTwo() {
        
        this.setState(
            {
                hoverTwo: true
            }
        )
    }; 

    onMouseOutTwo() {
        
        this.setState(
            {
                hoverTwo: false
            }
        )
    };
    
    onMouseOverThree() {
        
        this.setState(
            {
                hoverThree: true
            }
        )
    }; 

    onMouseOutThree() {
        
        this.setState(
            {
                hoverThree: false
            }
        )
    };

    render() {
        const { similarVehicles, hoverOne, hoverTwo, hoverThree, isLoading} = this.state;
        return(
            !isLoading ? 
            <div className="similarVehiclesContainer">
                <SimilarVehicles 
                    similarVehicles={similarVehicles} 
                    hoverOne={hoverOne} 
                    hoverTwo={hoverTwo}
                    hoverThree={hoverThree}  
                    onMouseOverOne={this.onMouseOverOne} 
                    onMouseOutOne={this.onMouseOutOne}
                    onMouseOverTwo={this.onMouseOverTwo} 
                    onMouseOutTwo={this.onMouseOutTwo}
                    onMouseOverThree={this.onMouseOverThree} 
                    onMouseOutThree={this.onMouseOutThree} 
                /> 
                <Form 
                getAllSimilarVehicles={this.getAllSimilarVehicles}
                postVehicle={this.postVehicle}
                deleteVehicle={this.deleteVehicle}
                updateVehicle={this.updateVehicle}
                />
            </div> : 
            <div><h1>Loading...</h1></div>
        ); 
    } 
} 

export default App;