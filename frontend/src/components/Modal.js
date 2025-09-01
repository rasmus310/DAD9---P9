import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from 'reactstrap';

// CustomModal viser en dialog til oprettelse/redigering af et "Todo item".
// Den er en kontrolleret formular, som læser/skriv værdier til lokal state,
// og gemmer via onSave-proppen. Dialogen lukkes via toggle-proppen.
export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    // Lokal kopi af det item, der redigeres. initialiseret fra props.
    // Forenkler formularhåndtering uden at ændre forælderens state direkte.
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  // Generisk change-handler for både tekstfelter og checkboxe.
  // Opdaterer det felt i activeItem, som matcher input'ets name-attribut.
  handleChange = (e) => {
    let { name, value } = e.target;

    // Checkboxe bruger checked i stedet for value
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    // Opret en ny kopi af activeItem med den opdaterede egenskab
    const activeItem = { ...this.state.activeItem, [name]: value };

    // Opdater lokal state, så inputs forbliver kontrollerede
    this.setState({ activeItem });
  };

  render() {
    // toggle: funktion til at lukke modalen (typisk fra forælder)
    // onSave: callback til at gemme det aktuelle item (sendes til forælder)
    const { toggle, onSave } = this.props;

    return (
      // Modalen er altid åben her; forælder styrer visning ved at mounte/unmounte
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
        <ModalBody>
          {/* Kontrolleret formular: værdierne kommer fra this.state.activeItem */}
          <Form>
            {/* Titel-felt */}
            <FormGroup>
              <Label for="todo-title">Title</Label>
              <Input
                type="text"
                id="todo-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>

            {/* Beskrivelse-felt */}
            <FormGroup>
              <Label for="todo-description">Description</Label>
              <Input
                type="text"
                id="todo-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>

            {/* Checkbox for status */}
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>

            {/* Gemmer nuværende formularværdier via onSave */}
            <Button color="primary" onClick={() => onSave(this.state.activeItem)}>
              Save
            </Button>
          </Form>
        </ModalBody>
        {/* ModalFooter kan bruges til ekstra handlinger eller sekundære knapper */}
        <ModalFooter />
      </Modal>
    );
  }
}