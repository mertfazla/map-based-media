"use client"
import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
function Textbox({onChange }) {
	const handleTextChange = (value) => {
		onChange(value); 
	  };
	return (
		<div>
			<ReactQuill theme="snow" onChange={handleTextChange} />
		</div>
	)
}

export default Textbox