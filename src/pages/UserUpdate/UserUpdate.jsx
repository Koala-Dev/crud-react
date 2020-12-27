import React, { Component } from 'react'
import './UserUpdate.css'
import Header from '../../components/Header/Header'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import InputGroup from 'react-bootstrap/InputGroup'
import { Col  } from 'react-bootstrap';
import Swal from 'sweetalert2'

const HeaderProps = {
    title: "Cadastrar pessoa"
}


class UserCreate extends Component {

    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            id:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://still-hamlet-87629.herokuapp.com/usuarios/${id}`)
            .then(res => res.json())
            .then(res => this.setState({ 
                name: res.name,
                email: res.email,
                id: res.id
            }))
        
    }

    handleChange(event) {
        let target = event.target
        let index = target.name
        this.setState({
            [index]: target.value
        });
      }

    handleSubmit(event) {
        if( this.state.name === "" || this.state.name === undefined || this.state.name === null ||
            this.state.email === "" || this.state.email === undefined || this.state.email === null) {
                alert("Insira valores válidos")
            }else{
                const name = this.state.name
                const email = this.state.email
                const id = this.state.id
                fetch(`https://still-hamlet-87629.herokuapp.com/updateUser/${id}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({name, email})})
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Parabéns!',
                            text: 'Cadastro alterado com sucesso!',
                            footer: '<a href>Why do I have this issue?</a>'
                          })
                    })
        event.preventDefault();
      }
    }

    render() {
        return (
            <div>
                {console.log(this.state.name)}
                <Header {...HeaderProps} />
                <Form className="form-userCreate">
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
                            <Form.Text className="text">
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    {/* <input className="button-submit-UserCreate" type="button" value="Confirmar" /> */}
                    <Button onClick={this.handleSubmit} className="button-submit-UserCreate" variant="primary">Confirm</Button>
                    <Button className="button-cancel-UserCreate" variant="danger"><a href="/">Cancel</a></Button>
                </Form>
            </div>
        )
    }
}

export default UserCreate;