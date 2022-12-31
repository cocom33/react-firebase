import React from 'react';

const Button = ({title, children, color = 'bg-sky-600', loading, ...props}) => {
	if(loading === true){
		return <button disabled className={`px-8 py-2 text-gray-800 rounded bg-slate-400`}>Loading...</button>
	}
	return (
		<button {...props} className={`px-8 py-2 text-white rounded ${color}`}>{title || children}</button>
	);
}

export default Button;
