import React from 'react'
import Navbar from '../Components/Navbar'
import { Form, Button, Row, Col } from 'react-bootstrap'

export default class BenefactorProfile extends React.Component {
  state = {
    fields: {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      gender: '',
      age: '',
      experience: '',
      freeTime: ''
    }
  }

  handleChange(event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='bene-container'>
          <div className='demographic-container' dir='rtl' style={{ margin: 'auto' }}>
            <h2 style={{ alignSelf: 'center', marginTop: '2%' }}> اطلاعات کاربری</h2>
            <Form>
              <Row>
                <Col>
                  <Form.Label> نام: </Form.Label>
                  <Form.Control name='firstname' placeholder='نام'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label> نام خانوادگی: </Form.Label>
                  <Form.Control name='lastname' placeholder='نام خانوادگی'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label> شماره تماس: </Form.Label>
                  <Form.Control placeholder='شماره تماس' name='phone'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label> ایمیل: </Form.Label>
                  <Form.Control name='email' placeholder='ایمیل'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label> آدرس: </Form.Label>
                  <Form.Control name='address' placeholder='آدرس'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm='8' >
                  <Form.Group controlId='exampleForm.ControlTextarea1'>
                    <Form.Label> توضیحات: </Form.Label>
                    <Form.Control as='textarea' rows='3' name='description'
                      onChange={(event) => this.handleChange(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label> جنسیت: </Form.Label>
                  <Form.Control as='select' name='gender'
                    onChange={(event) => this.handleChange(event)} >
                    <option value=''></option>
                    <option value='female'>زن</option>
                    <option value='male'>مرد</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label> سن: </Form.Label>
                  <Form.Control type='number' name='age' placeholder='سن'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label> تجربه نیکوکاری: </Form.Label>
                  <Form.Control name='experience' placeholder='تجربه نیکوکاری'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label> زمان آزاد در هفته: </Form.Label>
                  <Form.Control name='freeTime' placeholder='زمان آزاد در هفته'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col >
                  <Button variant='info'> ثبت اطلاعات </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
