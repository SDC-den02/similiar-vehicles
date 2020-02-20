import React from 'react'; 

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      year: '',
      make: '',
      model: '',
      vClass: '',
      price: '',
      miles: '',
      engineLCyl: '',
      transmission: '',
      exteriorColor: '',
      interiorColor: '',
      picture: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddVehicleSubmit = this.onAddVehicleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onUpdateVehicleSubmit = this.onUpdateVehicleSubmit.bind(this);
    this.onDeleteVehicleSubmit = this.onDeleteVehicleSubmit.bind(this);
  }
  onInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]:value
    })
  }
  clearForm() {
    this.setState({
      id: '',
      year: '',
      make: '',
      model: '',
      vClass: '',
      price: '',
      miles: '',
      engineLCyl: '',
      transmission: '',
      exteriorColor: '',
      interiorColor: '',
      picture: ''
    })
  }
  onAddVehicleSubmit(event) {
    //JS, not react, prevents default behavior and generates a query string
    event.preventDefault();
    const vehicle = this.state;
    this.props.postVehicle(vehicle);
    this.clearForm();
  }
  onUpdateVehicleSubmit(event) {
    //JS, not react, prevents default behavior and generates a query string
    event.preventDefault();
    const vehicle = this.state;
    this.props.updateVehicle(vehicle);
    this.clearForm();
  }
  onDeleteVehicleSubmit(event) {
    //JS, not react, prevents default behavior and generates a query string
    event.preventDefault();
    const id = this.state;
    this.props.deleteVehicle(id);
    this.clearForm();
  }

  render () {
    return (
      <div>
      <form >
      <label> ID
        <input name="id" value={this.state.id} onChange={this.onInputChange} />
      </label>
      <label> Year
        <input name="year" type="number" value={this.state.year} onChange={this.onInputChange} />
      </label>
      <label> Make
        <input name="make" value={this.state.make} onChange={this.onInputChange} />
      </label>
      <label> Model
      <input name="model" value={this.state.model} onChange={this.onInputChange} />
    </label>
    <label> Class
        <input name="vClass" value={this.state.vClass} onChange={this.onInputChange} />
      </label>
      <label> Price
        <input name="price" value={this.state.price} onChange={this.onInputChange} />
      </label>
      <label> Miles
      <input name="miles" value={this.state.miles} onChange={this.onInputChange} />
    </label>
    <label> EngineLCyl
        <input name="engineLCyl" value={this.state.engineLCyl} onChange={this.onInputChange} />
      </label>
      <label> Transmission
        <input name="transmission" value={this.state.transmission} onChange={this.onInputChange} />
      </label>
      <label> Exterior Color
      <input name="exteriorColor" value={this.state.exteriorColor} onChange={this.onInputChange} />
    </label>
    <label> Interior Color
        <input name="interiorColor" value={this.state.interiorColor} onChange={this.onInputChange} />
      </label>
      <label> Picture URL
        <input name="picture" value={this.state.picture} onChange={this.onInputChange} />
      </label>
        <button onClick={this.onAddVehicleSubmit}>Add Vehicle</button>
        <button onClick={this.onUpdateVehicleSubmit}>Update Vehicle</button>
        <button onClick={this.onDeleteVehicleSubmit}>Delete Vehicle</button>
        </form>
    </div>
    )
  }
}

export default Form;