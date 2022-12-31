import React, { Component } from 'react'
import { loginUserAPI } from 'config/redux/action'
import {connect} from 'react-redux'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import { useNavigate } from 'react-router-dom'

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} myHookValue={navigate} />;
  };
}

class Login extends Component {
	state = {
		email: '',
		password: '',
	}
	
	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	
	handleLoginSubmit = async () => {
		const { email, password } = this.state;
		const myHookValue = this.props.myHookValue;
		const res = await this.props.loginAPI({ email, password }).catch(err => err);
		if(res) {
			console.log('loginsuccess: ', res);
			localStorage.setItem('userData', JSON.stringify(res));
			this.setState({
				email: '',
				password: ''
			});
			myHookValue("/");
		} else {
			console.log('loginfailed');
		}
	}
	render() {
		return (
			<div>
				<div className="w-72 mx-auto flex items-center justify-center min-h-screen">
					<div className="rounded-lg p-3 bg-slate-100 w-full shadow-lg border">
						<p className='text-3xl font-bold text-blue-500'>halaman Login</p>
						<Input value={this.state.email} onChange={this.handleChangeText} placeholder='email' id='email' />
						<Input type="password" value={this.state.password} onChange={this.handleChangeText} placeholder='password' id='password' />
						
						<div className="flex justify-center mt-3">
							<Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const reduxState = (state) => ({
	isLoading: state.isLoading,
})

const reduxDispatch = (dispatch) => ({
	loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default withMyHook(connect(reduxState, reduxDispatch)(Login));