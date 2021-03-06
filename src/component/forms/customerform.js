import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {SERVER_URL} from "../../constants/serverconstants";


class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {full_name: '', email: '', blizzard_id: ''};
        this.onCustomerAdded = props.onCustomerAdded;
    }

    // Handle change listener for form control.
    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    // Event listener for "Add a Customer" button.
    handleSubmit = (event) => {
        alert('Ok to Submit?');

        const that = this

        fetch(`${SERVER_URL}/customers`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {

                that.onCustomerAdded(response.customers)
                return response.customers;
            });

        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formCustomerName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="name" name="full_name" placeholder="Enter full name"
                                      defaultValue={this.state.name} onChange={this.handleChange.bind(this)} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formCustomerEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email"
                                      defaultValue={this.state.email} onChange={this.handleChange.bind(this)} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Col} controlId="formCustomerBlizzardID">
                    <Form.Label>Blizzard ID</Form.Label>
                    <Form.Control type="text" name="blizzard_id" placeholder="Enter Blizzard ID"
                                  defaultValue={this.state.blizzard_id} onChange={this.handleChange.bind(this)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add a Customer
                </Button>
            </Form>
        );
    }
}

export default CustomerForm