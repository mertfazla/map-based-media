import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function Textbox({ onChange }) {
	const handleTextChange = (value) => {
		onChange(value);
	};

	return (
		<div className="w-full">
			<ReactQuill
				theme="snow"
				onChange={handleTextChange}
				modules={{
					toolbar: [
						[{ header: [1, 2, false] }],
						['bold', 'italic', 'underline', 'strike', 'blockquote'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link', 'image'],
						['clean'],
					],
				}}
			/>
		</div>
	);
}

export default Textbox;

