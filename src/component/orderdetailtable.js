import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Dropdown, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {SERVER_URL} from "../constants/serverconstants";
import Modal from "react-bootstrap/Modal";

// Function to show only two decimal points for the total price.
function twoDecimal(num) {
    return `${num.toFixed(2)}`;
}

// CSS Styling
const detailTableStyle = {
    width: "100%",
};


class OrderDetailTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_games: props.order_games,
            order_id: parseInt(props.order_id),
            isOpen: false
        }
        this.updateCallback = props.updateCallback
    }

    // Functions to open and close modal.
    openModal = (game_id) => this.setState({...this.state, isOpen: true, selected_game_id: game_id});
    closeModal = () => this.setState({...this.state, isOpen: false});

    // Onchange listener for form control.
    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    // Function to update selected_game_id in the state to the current selected/clicked game_id.
    updateCurrentGameId = (game_id) => this.setState({...this.state, selected_game_id: game_id})

    // Event listener for "Edit Quantity" button on the drop-down menu.
    handleSubmitUpdate = (event) => {
        event.preventDefault();
        const that = this

        fetch(`${SERVER_URL}/order_games_quantity`, {
            method: 'PUT',
            // convert the React state to JSON and send it as the POST body
            body: JSON.stringify({
                order_id: this.state.order_id,
                game_id: this.state.selected_game_id,
                quantity: this.state.quantity
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                that.setState({...that.state, isOpen: false})
                that.updateCallback(response.order_games)
            });
    }

    // Event listener for "Delete" button on the drop-down menu.
    handleSubmitDelete = (game_id) => {
        alert('Do you want to delete this game?');
        const that = this
        const order_id = this.state.order_id
        fetch(`${SERVER_URL}/order_games_delete?orderID=${order_id}&gameID=${game_id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(function (response) {
                that.updateCallback(response.order_games)
            });
    }

    render() {
        let invoiceTotal = 0
        this.props.order_games.forEach(row => {
            invoiceTotal += row.quantity * row.price
        })
        return (
            <div>
                <TableContainer component={Paper} style={detailTableStyle}>
                    <Table aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                            </TableRow>
                            <TableRow>
                                <TableCell>Game ID</TableCell>
                                <TableCell>Game Name</TableCell>
                                <TableCell align="center">Qty.</TableCell>
                                <TableCell align="center">Unit Price</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.order_games.map((row) => {
                                    return (<TableRow key={row.game_id}>
                                        <TableCell>{row.game_id}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="center">{row.quantity}</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        <TableCell align="center">{row.quantity * row.price}</TableCell>
                                        <TableCell align="right">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={this.openModal.bind(this, row.game_id)}>Edit
                                                        quantity</Dropdown.Item>
                                                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Edit Quantity</Modal.Title>
                                                        </Modal.Header>
                                                        <Form onSubmit={(event) => {
                                                            this.handleSubmitUpdate(event)
                                                        }}>
                                                            <Modal.Body>
                                                                <Form.Control type="quantity" name="quantity"
                                                                              placeholder="Enter how many"
                                                                              onChange={this.handleChange.bind(this)}
                                                                              required/>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="primary" type="submit"> Submit </Button>
                                                            </Modal.Footer>
                                                        </Form>
                                                    </Modal>
                                                    <Dropdown.Item
                                                        onClick={this.handleSubmitDelete.bind(this, row.game_id)}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>)
                                }
                            )}

                            <TableRow>
                                <TableCell colSpan={4} align="right">Total</TableCell>
                                <TableCell colSpan={2} align="right">{twoDecimal(invoiceTotal)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        );
    }
}

export default OrderDetailTable