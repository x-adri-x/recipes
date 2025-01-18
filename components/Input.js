const Input = (props) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={props.name} className='text-sm font-semibold text-white'>
        {props.label}
      </label>
      <input
        name={props.name}
        type='text'
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
        value={props.value}
        className='border p-2 bg-white/20 rounded-full shadow-small'
      />
    </div>
  )
}

export default Input
