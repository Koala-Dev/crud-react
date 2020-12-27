import React, { Component } from 'react'
import './UserView.css'

import Header from '../../components/Header/Header'
// components Bootstrap
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
// components FontAwesome
import { faWrench, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// components Sweet Alert 2
import Swal from 'sweetalert2'

const HeaderProps = {
    title: "Listagem de pessoas"
}

const icons = {
    Wrench: <FontAwesomeIcon icon={faWrench}/>,
    Trash: <FontAwesomeIcon icon={faTrash}/>,
    UserPlus: ` Adiconar ${<FontAwesomeIcon icon={faUserPlus}/>}`,
}


const buttons = {
    success: function(params) {
        return <Button variant="success">{params}</Button>
    },
    add: function(params) {
        return <Button variant="success">{params}</Button>
    },
    danger: function(params) {
        return <Button variant="danger">{params}</Button>
    },
}

class UserView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        fetch('https://still-hamlet-87629.herokuapp.com/usuarios')
            .then(res => res.json())
            .then(res => this.setState({ users: res}))
    }

    handleClick(id) {
        fetch(`https://still-hamlet-87629.herokuapp.com/deleteUser/${id}`,{
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => this.setState({ users: res}))
            .then(e => {
                Swal.fire({
                    icon: 'success',
                    title: 'Tudo pronto!',
                    text: 'Usuário excluído com sucesso!',
                    footer: '<a href>Why do I have this issue?</a>'
                  })
            })
    }

    render() {
        const { users } = this.state
        const handleClick = this.handleClick
        return (
            <div>
                <div>
                    <Header  {...HeaderProps} />
                </div>
                <Table striped bordered hover responsive className="table-userview">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(function (value, index) {
                            return (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td> <a href={`/update/${value.id}`}>{buttons.success(icons.Wrench)}</a> <Button onClick={e => handleClick(value.id)} variant="danger">{icons.Trash}</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <a href="/create" className="button-add-userview" >{buttons.add("Adicionar pessoa")}</a>
                </div>
            </div>
        )
    }
}

export default UserView;