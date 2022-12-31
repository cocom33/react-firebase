import React from 'react';

const Input = ({id, type = 'text', ...props}) => {
	return (
		<input id={id} {...props} type={type} className='w-full px-3 py-1 border rounded my-3 focus:outline-none focus:border-sky-800 focus:ring focus:ring-sky-300' />
	);
}

export default Input;
