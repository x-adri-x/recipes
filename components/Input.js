import styles from '../styles/Input.module.css'

const Input = (props) => {
   
    return(
        <div className={styles.container}>
            <label htmlFor = {props.name}>{props.label}</label>
            <input 
            name = {props.name} 
            type = 'text' 
            onChange = {(e) => {props.onChange(e.target.value)}} 
            value = {props.value}
            />
        </div>
    )
}

export default Input