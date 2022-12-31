import React, { Component } from 'react'
import Button from 'components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from 'config/redux/action';
import Input from 'components/atoms/Input';

class Register extends Component {
	state = {
		email: '',
		password: '',
	}
	
	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleRegisterSubmit = async () => {
		const { email, password } = this.state;
		const res = await this.props.registerAPI({ email, password }).catch(err => err);
		if(res){
			this.setState({
				email: '',
				password: ''
			})
		}
	}

	render() {
		return (
			<div>
				<div className="w-72 mx-auto flex items-center justify-center min-h-screen">
					<div className="rounded-lg p-3 bg-slate-100 w-full shadow-lg border">
						<p className='text-3xl font-bold text-blue-500'>halaman Register</p>
						<Input value={this.state.email} onChange={this.handleChangeText} placeholder='email' id='email' />
						<Input type="password" value={this.state.password} onChange={this.handleChangeText} placeholder='password' id='password' />
						
						<div className="flex justify-center mt-3">
							<Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
						</div>
						{/* <button className='px-5 py-1 rounded bg-sky-300'>ke register</button> */}
					</div>
				</div>
			</div>
		)
	}
}

const reduxState = (state) => ({
	isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
	registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register)