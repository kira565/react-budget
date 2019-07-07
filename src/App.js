import React from 'react';
import './App.css';
import moment from 'moment'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Incomes from "./components/Incomes";
import Expanse from "./components/Expanse";
//import findLastIndex from 'lodash';


const DateButton = styled.button`
color: black;
border: 1px solid black;
border-radius: 50%;
background-color: transparent;
width: 32px;
height: 32px;
margin: 5px;
cursor: pointer;
text-align: center;
`;
const DateLine = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;
const Nav = styled.div`
display:flex;
justify-content:center;
font-size:25px;
padding: 40px 0 15px
`;
const MainWrapper = styled.div`
display: flex;
justify-content: center;
`;
const TableWrapper = styled.div`
display:flex;
justify-content: center;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            transactions: [],
            budget: 0
        }
    }
    componentDidUpdate() {
        const {date} = this.state;
        localStorage.setItem(
            'state',
            JSON.stringify({...this.state, date: date.format()}),
        );
    }

    handleAddDay = () => {
        this.setState({
            date: this.state.date.add(1, 'day')
        })
    };
    handleSubtractDay = () => {
        this.setState({
            date: this.state.date.subtract(1, 'day')
        })
    };
    handleSubmitTransaction = (sum, category) => {
        const {date: TodayDate, transactions, budget} = this.state;
        this.setState({
            transactions: [...transactions, {transaction: sum, category: category, date: TodayDate.format('DD.MM.YYYY')}],
            budget: budget + sum
        });

    };
    handleOnToday = () => {
        const {budget, date} = this.state;

        const DATE_PASSED_DAYS = date.days(); // числовое значение сколько прошло от начала месяца
        const DAYS_IN_CURR_MONTH = date.daysInMonth();
        return (budget / (DAYS_IN_CURR_MONTH - DATE_PASSED_DAYS)).toFixed(2);
    };

    render() {
        const {date, transactions} = this.state;
        return <div className="container">
                <header>
                    <h1>React budget planning</h1>
                    <DateLine>
                        <DateButton onClick={this.handleSubtractDay}>-</DateButton>
                        <p>{date.format('DD.MM.YYYY')}</p>
                        <DateButton onClick={this.handleAddDay}>+</DateButton>
                    </DateLine>
                    <div>В среднем на оставшиеся дни: {this.handleOnToday() } рублей в день</div>
                </header>
                <main>
                    <Nav>
                        <NavLink activeClassName="selected_link" to='/incomes'>Доходы</NavLink>
                        <NavLink activeClassName="selected_link" to='/expanse'>Расходы</NavLink>
                    </Nav>
                    <MainWrapper>
                        <Route render={() => <Incomes onSubmit={this.handleSubmitTransaction}/>} path='/incomes'/>
                        <Route render={() => <Expanse onSubmit={this.handleSubmitTransaction}/>} path='/expanse'/>
                    </MainWrapper>
                </main>
                <TableWrapper>
                    <table>
                        <tbody>
                        {
                            transactions
                                .sort((a, b) => {
                                if (a.date > b.date) return 1;
                                if (a.date < b.date) return -1;
                                return 0;
                            })
                                .filter(transaction => moment(transaction.date, 'DD.MM.YYYY').isSame(date, 'month'))
                                .map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.transaction} ₽</td>
                                    <td>{transaction.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TableWrapper>
            </div>
    }
}

export default App;
