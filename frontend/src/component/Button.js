

function Button({color='#F59115', text, width='120px', height='40px', mr='0px', onclick}){
    return (
        <button style={{
            backgroundColor:color,
            width:width,
            height:height,
            border:'none',
            borderRadius:'10px',
            color:'#f8f9fa',
            marginTop:'10px',
            fontSize:'14px',
            cursor:'pointer',
            marginRight:mr
        }} onClick={onclick}>{text}</button>
    )
}

export default Button