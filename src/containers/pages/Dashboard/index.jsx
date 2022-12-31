import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import { addDataToAPI, getDataFromAPI, removeDataFromAPI, updateDataFromAPI } from 'config/redux/action'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
	state = {
		title: '',
		desc: '',
		date: '',
		textButton: 'simpan',
		noteId: ''
	}
	
	componentDidMount = () => {
		const userData = JSON.parse(localStorage.getItem('userData'));
		this.props.getNotes(userData.uid);
	}
	
	handleSaveNotes = () => {
		const { title, desc, textButton, noteId } = this.state;
		const { saveNotes, updateNotes } = this.props;
		const userData = JSON.parse(localStorage.getItem('userData'));
		const data = {
			title: title,
			desc: desc,
			date: new Date().getTime(),
			userId: userData.uid
		}
		if(textButton === 'simpan'){
			saveNotes(data);
		}else{
			data.noteId = noteId
			updateNotes(data);
		}
	}
	
	onInputChange = (e, type) => {
		this.setState({
			[type] : e.target.value
		})
	}
	
	updateNotes = (note) => {
		this.setState({
			title: note.data.title,
			desc: note.data.desc,
			textButton: 'update',
			noteId: note.id
		})
	}
	
	cancelUpdate = () => {
		this.setState({
			title: '',
			desc: '',
			textButton: 'simpan',
		})
	}
	
	deleteNote = (e, note) => {
		e.stopPropagation();
		const userData = JSON.parse(localStorage.getItem('userData'));
		console.log(note)
		const data = {
			userId: userData.uid,
			noteId: note.id,
		}
		// alert('hai');
		this.props.removeNotes(data);
	}
	
	render() {
		const { title, desc, textButton } = this.state;
		const { notes } = this.props;
		console.log('notes: ', notes);
		const { updateNotes, deleteNote } = this;
		return (
			<div>
				<div className="w-72 m-4 p-5 shadow rounded-lg bg-slate-50">
					<Input placeholder='title' value={title} onChange={(e) => this.onInputChange(e, 'title')} />
					<textarea name="desc" id="desc" value={desc} onChange={(e) => this.onInputChange(e, 'desc')} cols="30" rows="5" className='border rounded focus:outline-0 focus:ring focus:ring-sky-300' placeholder='desc'></textarea>
					
					<div className="mt-3 flex justify-between">
						<Button title={ textButton } onClick={this.handleSaveNotes}></Button>
					{ textButton === 'update' ? (
						<Button color='bg-orange-600' onClick={this.cancelUpdate}>Cancel</Button>
					) : null }
					</div>
				</div>
				<hr className="my-5 border-b" />
				{
					notes.length > 0 ? (
						<>
							{
								notes.map(note => {
									return (
										<div key={note.id} onClick={() => updateNotes(note)} className="relative mt-3 p-5 m-4 shadow rounded-xl bg-slate-50 hover:-translate-y-1 transition duration-300 hover:bg-gray-200 hover:cursor-pointer">
											<h1 className="text-2xl font-bold">{note.data.title}</h1>
											<p className="text-medium">{note.data.desc}</p>
											<p className="text-sm text-slate-500">{note.data.date}</p>
											<div onClick={(e) => deleteNote(e, note)} className="px-3 py-1 text-white shadow-md rounded-full bg-red-600 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">x</div>
										</div>
									)
								})
							}
						</>
					) : null
				}
			</div>
		)
	}
}

const reduxState = (state) => ({
	userData: state.user,
	notes: state.notes,
})

const reduxDispatch = (dispatch) => ({
	saveNotes: (data) => dispatch(addDataToAPI(data)),
	getNotes: (userId) => dispatch(getDataFromAPI(userId)),
	updateNotes: (data) => dispatch(updateDataFromAPI(data)),
	removeNotes: (data) => dispatch(removeDataFromAPI(data)),
})

export default connect(reduxState, reduxDispatch)(Dashboard)