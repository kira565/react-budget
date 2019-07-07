import React from 'react'
import styled from 'styled-components'
const IncomesContainer =  styled.div`
padding: 25px 25px 25px 25px;
border: 5px solid white;
border-radius: 15px;
`;
const InputLine =  styled.div`
display: flex;
flex-direction: row;
`;
const InputTitle =  styled.div`
`;
const LineInput =  styled.div`
`;
const Input =  styled.input`
border: none;
border-bottom: 1px solid white;
background-color: transparent
margin-left: 10px;
font-family: 'Marmelad';
`;
const Button = styled.button`
color: black;
border: 2px solid white;
border-radius: 31px;
background-color: transparent;
margin: 5px;
cursor: pointer;
text-align: center;
width: 80px;
height: 40px;
font-family: 'Marmelad';
font-size: 1.1em;
`;
const ButtonLine = styled.div`
margin-top: 25px;
display: flex;
justify-content: center;
`;

class Expanse extends React.Component{
    state = {
      transaction: '',
      category: ''
    };
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleEnter = () => {
        const {transaction, category} = this.state;
        const {onSubmit} = this.props;

        onSubmit(-1 * Math.abs(parseFloat(transaction)), category);
        this.setState({transaction: '', category: ''})
    };

    render(){
        const {transaction, category} = this.state;
        return ( <IncomesContainer>
                <InputLine>
                    <InputTitle>Добавить расход:</InputTitle>
                    <LineInput>
                        <Input
                            name="transaction"
                            value = {transaction}
                            onChange = {this.handleChangeInput}
                        />
                    </LineInput>
                </InputLine>
                <InputLine>
                    <InputTitle>Категория расхода:</InputTitle>
                    <LineInput>
                        <Input
                            name="category"
                            value = {category}
                            onChange = {this.handleChangeInput}
                        />
                    </LineInput>
                </InputLine>
                <ButtonLine>
                    <Button onClick={this.handleEnter}>Внести</Button>
                </ButtonLine>
            </IncomesContainer>
        )
    }
}
export default Expanse