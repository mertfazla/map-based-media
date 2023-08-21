export const Title = ({Title1, Title2}) => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-3'>
			<h1 className='text-3xl font-bold text-center'>{Title1}</h1>
			<h2 className='text-xl text-center'>{Title2}</h2>
		</div>
	)
}

export default Title;